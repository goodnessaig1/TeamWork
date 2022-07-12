// const express = require('express');
// const users = require('./routes/adminRoute');
// const gifRoutes = require('./routes/gifRoute');
// const categoryRoutes = require('./routes/categoryRoute');
// const articeRoute = require('./routes/articleRoute');

// const app = express();
// const cors = require('cors');

//  initial testing route

// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
// const authorization = require('./middleware/authorization');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Swagger Documentation For TeamWork Backend',
//       version: '2.0.0',
//       description: 'Node js project for team work',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'apiKey',
//           name: 'token',
//           scheme: 'bearer',
//           in: 'header',
//         },
//       },
//     },
//     bearerAuth: {
//       type: 'http',
//       scheme: 'bearer',
//     },
//   },
//   apis: ['./index.js'],
// };

// const swaggerSpec = swaggerJSDoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// /**
//  * @swagger
//  * /:
//  *  get:
//  *    summary: This api is used to check if get method is working or not
//  *    description: This api is used to check if get method is working or not
//  *    responses:
//  *          200:
//  *              description: To test Get method
//  */

// /**
//  * @swagger
//  * /v1/articles:
//  *  get:
//  *      tags:
//  *         - Articles
//  *      security:              # <--- ADD THIS
//  *          - bearerAuth: []     # <--- ADD THIS
//  *      summary: To get all articles posted on the blog
//  *      description: This api is used to fetch all articles posted
//  *      responses:
//  *          200:
//  *               description: This api is used to fetch all the articles posted
//  *               content:
//  *                    application/json:
//  *                           schema:
//  *                                type: object
//  *                                items:
//  */

// /**
//  * @swagger
//  * /v1/articles/{articleId}:
//  *  get:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *     - Articles
//  *     summary: Get a single Article with id
//  *     parameters:
//  *      - name: articleId
//  *        in: path
//  *        description: The unique id of an article
//  *        required: true
//  *     responses:
//  *      200:
//  *        description: Success
//  *      400:
//  *        description: Bad request
//  *      404:
//  *        description: Not Found
//  */

// /**
//  * @swagger
//  * /v1/articles/{articleId}:
//  *  patch:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *     - Articles
//  *     summary: Update a single Article with id
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *            type: object
//  *     parameters:
//  *      - name: articleId
//  *        in: path
//  *        description: The unique id of an article
//  *        required: true
//  *     responses:
//  *      201:
//  *        description: Success
//  *      400:
//  *        description: Bad request
//  *      404:
//  *        description: Not Found
//  */

// /**
//  * @swagger
//  * /v1/articles/{articleId}:
//  *  delete:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *     - Articles
//  *     summary: Delete a single Article with id
//  *     parameters:
//  *      - name: articleId
//  *        in: path
//  *        description: The unique id of an article
//  *        required: true
//  *     responses:
//  *      200:
//  *        description: Success
//  *      400:
//  *        description: Bad request
//  *      404:
//  *        description: Not Found
//  */

// /**
//  * @swagger
//  * /v1/articles/{articleId}:
//  *  patch:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *     - Articles
//  *     summary: Update a single Article with id
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *            type: object
//  *     parameters:
//  *      - name: articleId
//  *        in: path
//  *        description: The unique id of an article
//  *        required: true
//  *     responses:
//  *      201:
//  *        description: Success
//  *      400:
//  *        description: Bad request
//  *      404:
//  *        description: Not Found
//  */

// /**
//  * @swagger
//  * /v1/articles:
//  *  post:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *     - Articles
//  *     summary: Create an article
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *            type: object
//  *     responses:
//  *      201:
//  *        description: Created
//  *      409:
//  *        description: Conflict
//  *      404:
//  *        description: Not Found
//  */

// /**
//  * @swagger
//  * /auth/v1/create-user:
//  *  post:
//  *     tags:
//  *     - Users
//  *     summary: Employee and admin can create a user account
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *            type: object
//  *           properties:
//  *               email:
//  *                   type: string
//  *               password:
//  *                   type: string
//  *           example:
//  *               firstName: "goodness"
//  *               lastName: "ose"
//  *               email: "goodness@gmail.com"
//  *               password: "password123"
//  *               gender: "Male"
//  *               jobRole: "developer"
//  *               department: "Admin"
//  *               isAdmin: false
//  *               address: "rsadfaloot"
//  *     responses:
//  *      201:
//  *        description: Success
//  *      409:
//  *        description: Conflict
//  *      404:
//  *        description: Not Found
//  */

// /**
//  * @swagger
//  * /auth/v1/signin:
//  *  post:
//  *      tags:
//  *          - Users
//  *      summary: "Returns Authorization Token"
//  *      description: "Authorizes default users with username and password set as root to use the endpoints"
//  *      requestBody:
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      type: object
//  *                      properties:
//  *                          email:
//  *                              type: string
//  *                          password:
//  *                              type: string
//  *              example:
//  *                  email: "user@email.com"
//  *                  password: "root"
//  *      produces:
//  *          - application/json
//  *      responses:
//  *          200:
//  *              description: "Authorization token"
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: object
//  *                      example:
//  *                          "data": "token"
//  *
//  */

// app.get('/', authorization, (req, resp) => {
//   resp.send('Welcome to teamwork testing with swagger');
// });

// //       MIDDLEWARES
// app.use(express.json());
// app.use(cors());

// //   REGISTER AND LOGIN ROUTES
// app.use('/auth/v1', users);

// // GIF ROUTE
// app.use('/v1/gifs', gifRoutes);

// //  CATEGORY ROUTE
// app.use('/v1/categories', categoryRoutes);

// //  ARTICLE ROUTE
// app.use('/v1/articles', articeRoute);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`App is running ${port}`);
// });

// module.exports = app;
