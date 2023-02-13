import db from '../lib/db';
import bcrypt from 'bcrypt';

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
      throw new Error('Username already exists');
    }
    if (emailExists) {
      throw new Error('Email already exists');
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await db.user.create({
      data: {
        username,
        email,
        passwordHash: hash,
      },
    });

    return user;
  }

  login() {
    return 'logged in';
  }
}

export default UserService;
