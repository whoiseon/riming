import fastify from 'fastify';

const app = fastify({});

app.get('/ping', async () => {
  return 'pong hello waef12';
});

app.listen({ port: 4000 });
