const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const rescue = require('./rescue')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.post('/users', rescue(routes.createUsers));
apiRoutes.post('/login', rescue(routes.login))

app.use(apiRoutes);

module.exports = app;
