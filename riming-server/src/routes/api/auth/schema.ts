import { FastifySchema } from 'fastify';

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
    user: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
      },
    },
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
  },
};

export const loginSchema: FastifySchema = {
  body: loginBodySchema,
  response: {
    200: authResultSchema,
  },
};
