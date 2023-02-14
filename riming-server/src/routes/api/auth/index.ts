import UserService from '../../../services/UserService';
import { FastifyPluginAsync } from 'fastify';

import { registerSchema, loginSchema } from './schema';
import { RegisterBody, LoginBody } from './types';

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance();

  fastify.post<{ Body: LoginBody }>(
    '/login',
    {
      schema: loginSchema,
    },
    async (request, reply) => {
      const authResult = await userService.login(request.body);
      reply.setCookie('access_token', authResult.tokens.accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        path: '/',
      });
      reply.setCookie('refresh_token', authResult.tokens.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        path: '/',
      });

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
};

export default authRoute;
