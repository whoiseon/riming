import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';

import routes from './routes';
import { swaggerConfig } from './config/swagger';
import db from './lib/db';
import AppError from './lib/AppError';

const fastify = Fastify({
  logger: true,
});

if (process.env.NODE_ENV !== 'production') {
  await fastify.register(fastifySwagger, swaggerConfig);
}

fastify.setErrorHandler(async (error, request, reply) => {
  reply.statusCode = error.statusCode ?? 500;
  if (error instanceof AppError) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
    };
  }
  return error;
});

fastify.register(routes);

fastify.listen({ port: 4000 }, () => {
  console.log('server on 4000');
});
