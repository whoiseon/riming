import UserService from '../../../services/UserService';
import { FastifyPluginAsync, FastifyReply } from 'fastify';

import { registerSchema, loginSchema, refreshTokenSchema } from './schema';
import { RegisterBody, LoginBody } from './types';
import AppError from '../../../lib/AppError';

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance();

  fastify.post<{ Body: LoginBody }>(
    '/login',
    {
      schema: loginSchema,
    },
    async (request, reply) => {
      const authResult = await userService.login(request.body);
      setTokenCookie(reply, authResult.tokens);

      return authResult;
    },
  );

  fastify.post<{ Body: RegisterBody }>(
    '/register',
    {
      schema: registerSchema,
    },
    async (request) => {
      return userService.register(request.body);
    },
  );

  fastify.post<{ Body: { refreshToken?: string } }>(
    '/refresh',
    {
      schema: refreshTokenSchema,
    },
    async (request, reply) => {
      const refreshToken =
        request.cookies.refresh_token ?? request.body.refreshToken ?? '';
      if (!refreshToken) {
        throw new AppError('BadRequestError');
      }
      const tokens = await userService.refreshToken(refreshToken);
      setTokenCookie(reply, tokens);
      return tokens;
    },
  );
};

function setTokenCookie(
  reply: FastifyReply,
  tokens: { accessToken: string; refreshToken: string },
) {
  reply.setCookie('access_token', tokens.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    path: '/',
  });
  reply.setCookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    path: '/',
  });
}

export default authRoute;
