import { FastifyPluginAsync } from 'fastify';
import requireAuthPlugin from '../../../plugins/requireAuthPlugin';
import UserService from '../../../services/UserService';

export const marketRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance();

  fastify.register(requireAuthPlugin);
  fastify.get('/create', async (request) => {
    const market = await userService.market({ userId: request.user?.id });
    return {
      ...request.user,
      market,
    };
  });
};
