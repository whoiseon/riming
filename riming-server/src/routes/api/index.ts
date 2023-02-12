import { FastifyPluginAsync } from 'fastify';
import authRoute from './auth';

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoute, { prefix: '/auth' });
};

export default api;
