import { FastifyPluginAsync } from 'fastify';

import authRoute from './auth';
import { marketRoute } from './market';
import { meRoute } from './me';

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoute, { prefix: '/auth' });
  fastify.register(meRoute, { prefix: '/me' });
  fastify.register(marketRoute, { prefix: '/market' });
};

export default api;
