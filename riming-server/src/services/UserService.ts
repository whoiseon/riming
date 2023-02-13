import db from '../lib/db';
import bcrypt from 'bcrypt';
import AppError, { isAppError } from '../lib/AppError';
import { generateToken } from '../lib/tokens';
import { User } from '@prisma/client';

const SALT_ROUNDS = 10;

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}
interface LoginParams {
  email: string;
  password: string;
}
class UserService {
  private static instance: UserService;
  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  async gerateTokens(user: User) {
    const { id: userId, email, username } = user;
    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId: 1,
        email,
        username,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId: 1,
        rotationCounter: 1,
      }),
    ]);

    return { refreshToken, accessToken };
  }

  async register({ username, email, password }: RegisterParams) {
    const usernameExists = await db.user.findUnique({
      where: {
        username,
      },
    });
    const emailExists = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (usernameExists) {
      throw new AppError('UsernameExistsError');
    }
    if (emailExists) {
      throw new AppError('EmailExistsError');
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await db.user.create({
      data: {
        username,
        email,
        passwordHash: hash,
      },
    });

    const tokens = await this.gerateTokens(user);
    return {
      user,
      tokens,
    };
  }

  async login({ email, password }: LoginParams) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('AuthenticationError');
    }

    try {
      const result = await bcrypt.compare(password, user.passwordHash);
      if (!result) {
        throw new AppError('AuthenticationError');
      }
    } catch (error) {
      if (isAppError(error)) {
        throw error;
      }
      throw new AppError('UnknownError');
    }

    const tokens = await this.gerateTokens(user);

    return {
      user,
      tokens,
    };
  }
}

export default UserService;
