const options = {
    openapi: 'OpenAPI 3',   
    language: 'en-US',      
    disableLogs: false,     
    autoHeaders: false,     
    autoQuery: false,       
    autoBody: false         
}

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',      
    title: 'Weather Api',        
    description: 'API for getting weather data for a city',  
    contact: {
        'name': 'API Support',
        'email': 'amansingh199835@gmail.com'
    },
  },
  host: "localhost:8080",      
  basePath: '/',  
  schemes: ['http'],   
  consumes: ['application/json'],  
  produces: ['application/json'],  
  tags: [        
    {
      name: 'Weather API',     
      description: 'Weather API for City',  
    }
  ],
  securityDefinitions: {},  
//   definitions: {
//     weatherResponse: {
//       code: '200',
//       message: 'Success',
//     },
//     'errorResponse.404': {
//       "code": "404",
//       "message": "Not found",
//     },
//     'errorResponse.500': {
//       code: '500',
//       message: 'Internal Server Error',
//     }
//   },          
};

const outputFile = '../docs/swagger.json';
const endpointsFiles = ['./app.js', '../controllers/weatherController.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });