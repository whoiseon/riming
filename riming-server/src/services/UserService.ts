import db from '../lib/db';
import bcrypt from 'bcrypt';
import AppError from '../lib/AppError';
import { generateToken } from '../lib/tokens';

const SALT_ROUNDS = 10;

interface AuthParams {
  username: string;
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

  async gerateTokens(userId: number, email: string, username: string) {
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

  async register({ username, email, password }: AuthParams) {
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

    const tokens = await this.gerateTokens(user.id, email, username);
    return {
      tokens,
      user,
    };
  }

  login() {
    return 'logged in';
  }
}

export default UserService;
