import axios from 'axios';

export type ErrorName =
  | 'UsernameExistsError'
  | 'EmailExistsError'
  | 'AuthenticationError'
  | 'UnknownError'
  | 'UnauthorizedError'
  | 'BadRequestError'
  | 'RefreshTokenError';

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

interface AppError {
  statusCode: number;
  message: string;
  name: ErrorName;
  payload?: ErrorPayloads[ErrorName];
}

export function isAppError(error: any): error is AppError {
  return (
    error?.statusCode !== undefined && error?.message !== undefined && error?.name !== undefined
  );
}

export function extractError(error: any): AppError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (isAppError(data)) {
      return data;
    }
  }

  return {
    statusCode: 500,
    message: 'Unknown error',
    name: 'UnknownError',
  };
}
