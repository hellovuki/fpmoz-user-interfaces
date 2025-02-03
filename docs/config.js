const lodash = require('lodash');
const sharedSchema = require('./schemas/shared.json');
const userSchema = require('./schemas/user.json');
const recipeSchema = require('./schemas/recipe.json');
const userRoutes = require('./routes/user.json');
const recipeRoutes = require('./routes/recipe.json');

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
  recipeSchema,
  userRoutes,
  recipeRoutes
);

module.exports = config;
