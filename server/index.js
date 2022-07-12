const express = require('express');
const users = require('./routes/adminRoute');
const gifRoutes = require('./routes/gifRoute');
const categoryRoutes = require('./routes/categoryRoute');
const articeRoute = require('./routes/articleRoute');

const app = express();
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, resp) => {
  resp.send('Welcome to teamwork testing with swagger');
});

//       MIDDLEWARES
app.use(express.json());
app.use(cors());

//   REGISTER AND LOGIN ROUTES
app.use('/auth/v1', users);

// GIF ROUTE
app.use('/v1/gifs', gifRoutes);

//  CATEGORY ROUTE
app.use('/v1/categories', categoryRoutes);

//  ARTICLE ROUTE
app.use('/v1/articles', articeRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running ${port}`);
});

module.exports = app;
