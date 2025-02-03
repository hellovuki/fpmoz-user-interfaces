const lodash = require('lodash');
const sharedSchema = require('./schemas/shared.json');
const userSchema = require('./schemas/user.json');
const animalSchema = require('./schemas/animal.json');
const userRoutes = require('./routes/user.json');
const animalRoutes = require('./routes/animal.json');

const config = lodash.merge(
  {
    openapi: '3.1.0',
    info: {
      title: 'Netflix clone API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  },
  sharedSchema,
  userSchema,
  animalSchema,
  userRoutes,
  animalRoutes
);

module.exports = config;
