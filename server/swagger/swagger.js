const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Documentation For TeamWork Backend',
      version: '2.0.0',
      description: 'Node js project for team work',
    },
    servers: [
      {
        url: 'https://tea-a4jv.onrender.com/',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  apis: ['./server/swagger/index.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
