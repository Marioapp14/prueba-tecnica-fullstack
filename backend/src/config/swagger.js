const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Productos",
      version: "1.0.0",
      description: "API para gestión de productos, categorías y proveedores"
    },
    servers: [
      {
        url: "http://localhost:3001"
      }
    ]
  },
  apis: ["./src/routes/*.js"], // Ruta a los archivos de rutas para generar la documentación
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;