type ErrorName =
  | 'UsernameExistsError'
  | 'EmailExistsError'
  | 'AuthenticationError'
  | 'UnknownError'
  | 'UnauthorizedError'
  | 'BadRequestError'
  | 'RefreshTokenError';
type ErrorInfo = {
  message: string;
  statusCode: number;
};

interface ErrorPayloads {
  UsernameExistsError: undefined;
  EmailExistsError: undefined;
  AuthenticationError: undefined;
  UnknownError: undefined;
  UnauthorizedError: {
    isExpiredToken: boolean;
  };
  BadRequestError: undefined;
  RefreshTokenError: undefined;
}

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
  BadRequestError: {
    message: 'Bad request',
    statusCode: 400,
  },
  RefreshTokenError: {
    message: 'Failed to refresh token',
    statusCode: 401,
  },
};

export default class AppError extends Error {
  public statusCode: number;

  constructor(
    public name: ErrorName,
    public payload?: ErrorPayloads[ErrorName],
  ) {
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

export function createAppErrorSchema<T, S>(example: T, payloadSchema?: S) {
  return {
    type: 'object',
    properties: {
      ...appErrorSchema.properties,
      ...(payloadSchema ? { payload: payloadSchema } : {}),
    },
    example,
  };
}
