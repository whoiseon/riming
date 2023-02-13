import { FastifySchema } from 'fastify';
import { appErrorSchema, createAppErrorSchema } from '../../../lib/AppError';
import { userSchema } from '../../../schema/userSchema';

const authResultSchema = {
  type: 'object',
  properties: {
    tokens: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
    user: userSchema,
  },
};

const registerBodySchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    username: { type: 'string' },
  },
};

const loginBodySchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
};

export const registerSchema: FastifySchema = {
  body: registerBodySchema,
  response: {
    200: authResultSchema,
    409: createAppErrorSchema({
      name: 'UsernameExistsError',
      message: 'Username already exists',
      statusCode: 409,
    }),
  },
};

export const loginSchema: FastifySchema = {
  body: loginBodySchema,
  response: {
    200: authResultSchema,
    401: createAppErrorSchema({
      name: 'AuthenticationError',
      message: 'Invalid password or email',
      statusCode: 401,
    }),
  },
};
