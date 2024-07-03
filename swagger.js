const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Api ENDXEND',
    },
    servers: [
      {
        url: 'http://localhost:8080', // Mettez ici l'URL de votre serveur
        // url: 'http://51.75.27.118', // Mettez ici l'URL de votre serveur
        description: 'Serveur en ligne',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer token to access these api endpoints',
          scheme: 'bearer',
          bearerFormat: 'JWT',
       }
      }
    }
    // security: [{
    //     bearerAuth: []
    // }]
  },
  apis: ['./routes/*.js'], // Mettez ici le chemin vers vos fichiers de routes
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  // Options pour personnaliser l'interface Swagger
  const swaggerUiOptions = {
    // Désactiver les boutons "Try it"
    swaggerOptions: {
      plugins: [
        {
          tryItOutEnabled: false,
        },
      ],
    },
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));
};
