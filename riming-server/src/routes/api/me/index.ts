import { FastifyPluginAsync } from 'fastify';
import requireAuthPlugin from '../../../plugins/requireAuthPlugin';
import { getMeSchema } from './schema';

export const meRoute: FastifyPluginAsync = async (fastify) => {
  fastify.register(requireAuthPlugin);
  fastify.get(
    '/',
    {
      schema: getMeSchema,
    },
    async (request) => {
      return request.user;
    },
  );
};
