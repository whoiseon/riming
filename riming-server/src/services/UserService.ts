import db from '../lib/db';
import bcrypt from 'bcrypt';
import AppError, { isAppError } from '../lib/AppError';
import {
  generateToken,
  RefreshTokenPayload,
  validateToken,
} from '../lib/tokens';
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

  async createTokenId(userId: number) {
    const token = await db.token.create({
      data: {
        userId,
      },
    });
    return token.id;
  }

  async generateTokens(user: User, existingTokenId?: number) {
    const { id: userId, email, username } = user;
    const tokenId = existingTokenId ?? (await this.createTokenId(userId));
    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'access_token',
        userId,
        tokenId,
        email,
        username,
      }),
      generateToken({
        type: 'refresh_token',
        tokenId,
        rotationCounter: 1,
      }),
    ]);

    return { refreshToken, accessToken };
  }

  async refreshToken(token: string) {
    try {
      const { tokenId } = await validateToken<RefreshTokenPayload>(token);
      const tokenItem = await db.token.findUnique({
        where: {
          id: tokenId,
        },
        include: {
          user: true,
        },
      });
      if (!tokenItem) {
        throw new Error('Token not found');
      }
      return await this.generateTokens(tokenItem.user, tokenId);
    } catch (error) {
      throw new AppError('RefreshTokenError');
    }
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

    const tokens = await this.generateTokens(user);
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

    const tokens = await this.generateTokens(user);

    return {
      user,
      tokens,
    };
  }
}

export default UserService;
