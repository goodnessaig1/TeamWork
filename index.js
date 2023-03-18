const express = require('express');
const fileupload = require('express-fileupload');
const users = require('./server/routes/adminRoute');
const gifRoutes = require('./server/routes/gifRoute');
const categoryRoutes = require('./server/routes/categoryRoute');
const colorRoutes = require('./server/routes/colorRoute');
const articeRoute = require('./server/routes/articleRoute');
const feedsRoute = require('./server/routes/feedRoute');
const notificationsRoute = require('./server/routes/notificationsRoute');

const { resolve } = require('path');

// const http = require('http');

const app = express();
const cors = require('cors');

// ======== SWAGGER DOCUMENTATION ROUTE
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./server/swagger/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, resp) => {
  resp.send('Welcome to teamwork testing with swagger');
});

//       MIDDLEWARES
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(fileupload({ useTempFiles: true }));
app.use(express.static(resolve(__dirname, 'src/public')));

//   REGISTER AND LOGIN ROUTES
app.use('/auth/v1', users);

// GIF ROUTE
app.use('/v1/gifs', gifRoutes);

//  CATEGORY ROUTE
app.use('/v1/categories', categoryRoutes);

//  COLOR ROUTE
app.use('/v1/colors', colorRoutes);

//  ARTICLE ROUTE
app.use('/v1/articles', articeRoute);

//  FEEDS ROUTE
app.use('/v1/feeds', feedsRoute);
//  FEEDS ROUTE
app.use('/v1/notifications', notificationsRoute);

module.exports = app;
