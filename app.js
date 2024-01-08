//importing dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cacheMiddleware = require('./middlewares/cacheMiddleware.js');
const routes = require('./routes');
const app = express();
const port = process.env.PORT;
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

//Cors middleware
app.use(cors());

// cache midddleware
const cacheDuration = 300;
app.use('/weather/:city', cacheMiddleware(cacheDuration));

//Serving react frontend as static folder
app.use(express.static(path.join(__dirname, './build')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
