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
    async (request) => {
      return userService.login(request.body);
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
