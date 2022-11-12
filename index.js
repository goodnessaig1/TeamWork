const express = require('express');
const fileupload = require('express-fileupload');
const users = require('./server/routes/adminRoute');
const gifRoutes = require('./server/routes/gifRoute');
const categoryRoutes = require('./server/routes/categoryRoute');
const articeRoute = require('./server/routes/articleRoute');
const feedsRoute = require('./server/routes/feedRoute');
// const formidable = require('express-formidable');
// const bodyParser = require('body-parser');

const { resolve } = require('path');

const http = require('http');

const app = express();
const cors = require('cors');

// ======== SWAGGER DOCUMENTATION ROUTE
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./server/swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, resp) => {
  resp.send('Welcome to teamwork testing with swagger');
});

//       MIDDLEWARES
// app.use(formidable());
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

app.use(express.static(resolve(__dirname, 'src/public')));
app.use(fileupload({ useTempFiles: true }));
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

//  FEEDS ROUTE
app.use('/v1/feeds', feedsRoute);

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port, () => {
  console.log(`App is running ${port}`);
});

module.exports = app;
