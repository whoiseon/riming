import UserService from '../../../services/UserService';
import { FastifyPluginAsync } from 'fastify';

import { registerSchema, loginSchema } from './schema';
import { AuthBody } from './types';

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance();

  fastify.post(
    '/login',
    {
      schema: loginSchema,
    },
    async () => {
      return userService.login();
    },
  );

  fastify.post<{ Body: AuthBody }>(
    '/register',
    {
      schema: registerSchema,
    },
    async (fastify) => {
      const user = await userService.register(fastify.body);

      return {
        user,
      };
    },
  );
};

export default authRoute;
