import { FastifyPluginAsync } from 'fastify';
import requireAuthPlugin from '../../../plugins/requireAuthPlugin';
import UserService from '../../../services/UserService';
import { getMeSchema } from './schema';

export const meRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance();

  fastify.register(requireAuthPlugin);
  fastify.get(
    '/',
    {
      schema: getMeSchema,
    },
    async (request) => {
      const market = await userService.market({ userId: request.user?.id });
      return {
        ...request.user,
        market,
      };
    },
  );
};
