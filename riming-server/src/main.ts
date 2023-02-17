import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';

import routes from './routes';
import { swaggerConfig } from './config/swagger';
import AppError from './lib/AppError';

import 'dotenv/config';
import { authPlugin } from './plugins/authPlugin';

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: true,
  allowedHeaders: ['Cookie', 'Content-Type'],
  credentials: true,
});

if (process.env.NODE_ENV !== 'production') {
  await fastify.register(fastifySwagger, swaggerConfig);
}

fastify.register(fastifyCookie, {});

fastify.setErrorHandler(async (error, request, reply) => {
  reply.statusCode = error.statusCode ?? 500;
  if (error instanceof AppError) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      payload: error.payload,
    };
  }
  return error;
});

fastify.register(authPlugin);
fastify.register(routes);

fastify.listen({ port: 4000 }, () => {
  console.log('server on 4000');
});
