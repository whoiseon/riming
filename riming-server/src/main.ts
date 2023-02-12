import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';

import routes from './routes';
import { swaggerConfig } from './config/swagger';

const fastify = Fastify({
  logger: true,
});

if (process.env.NODE_ENV !== 'production') {
  await fastify.register(fastifySwagger, swaggerConfig);
}

fastify.register(routes);

fastify.listen({ port: 4000 }, () => {
  console.log('server on 4000');
});
