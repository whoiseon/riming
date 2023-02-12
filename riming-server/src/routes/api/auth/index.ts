import UserService from '../../../services/UserService';
import { FastifyPluginAsync } from 'fastify';

import { registerSchema, loginSchema } from './schema';

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

  fastify.post(
    '/register',
    {
      schema: registerSchema,
    },
    async () => {
      return userService.register();
    },
  );
};

export default authRoute;
