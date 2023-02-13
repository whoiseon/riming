type ErrorName =
  | 'UsernameExistsError'
  | 'EmailExistsError'
  | 'AuthenticationError'
  | 'UnknownError'
  | 'UnauthorizedError';
type ErrorInfo = {
  message: string;
  statusCode: number;
};

const statusCodeMap: Record<ErrorName, ErrorInfo> = {
  UsernameExistsError: {
    message: 'Username already exists',
    statusCode: 409,
  },
  EmailExistsError: {
    message: 'Email already exists',
    statusCode: 409,
  },
  AuthenticationError: {
    message: 'Invalid password or email',
    statusCode: 401,
  },
  UnknownError: {
    message: 'Unknown error',
    statusCode: 500,
  },
  UnauthorizedError: {
    message: 'Unauthorized',
    statusCode: 401,
  },
};

export default class AppError extends Error {
  public statusCode: number;

  constructor(public name: ErrorName) {
    const info = statusCodeMap[name];
    super(info.message);
    this.statusCode = info.statusCode;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export const appErrorSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    message: { type: 'string' },
    statusCode: { type: 'number' },
  },
};

export function createAppErrorSchema<T>(example: T) {
  return {
    ...appErrorSchema,
    example,
  };
}
