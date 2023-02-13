import { AccessTokenPayload } from './../lib/tokens';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';
import { validateToken } from '../lib/tokens';

const { JsonWebTokenError } = jwt;

const authPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null);
  fastify.addHook('preHandler', async (request) => {
    const { authorization } = request.headers;
    if (!authorization || authorization?.includes('Bearer')) {
      return;
    }

    const token = authorization.split(' ')[1];
    try {
      const decoded = await validateToken<AccessTokenPayload>(token);
      console.log(decoded);
    } catch (error: any) {
      if (error instanceof JsonWebTokenError) {
        if (error.name === 'TokenExpiredError') {
          // todo: handle token expired
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
  }
}
