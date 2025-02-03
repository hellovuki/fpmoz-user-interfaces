const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const recipeRouter = require('./routes/recipe');
const errorController = require('./controller/error');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const docsConfig = require('./docs/config');

const app = express();
app.use(cors());

app.use(express.json({ limit: '10kb' }));

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipes', recipeRouter);

// DOCS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docsConfig));

app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
