export const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    username: { type: 'string' },
  },
  example: {
    id: 1,
    email: 'test@example.com',
    username: 'riming',
    marekt: {
      id: 1,
      name: 'marekt',
    },
  },
};
