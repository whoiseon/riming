import { AccessTokenPayload } from './../lib/tokens';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';
import { validateToken } from '../lib/tokens';
import AppError from '../lib/AppError';

const { JsonWebTokenError } = jwt;

const authPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null);
  fastify.decorateRequest('isExpiredToken', false);
  fastify.addHook('preHandler', async (request) => {
    const { authorization } = request.headers;
    const token = authorization?.split(' ')[1] ?? request.cookies.access_token;

    if (!token) return;

    try {
      const decoded = await validateToken<AccessTokenPayload>(token);
      request.user = {
        id: decoded.userId,
        username: decoded.username,
        email: decoded.email,
      };
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        if (error.name === 'TokenExpiredError') {
          request.isExpiredToken = true;
        }
      }
    }
  });
};

export const authPlugin = fp(authPluginAsync, {
  name: 'authPlugin',
});

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: number;
      email: string;
      username: string;
    } | null;
    isExpiredToken: boolean;
  }
}
