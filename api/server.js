const express = require('express');
const bodyParser = require('body-parser');
const { createUsers, login } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();
apiRoutes.post('/users', createUsers);
apiRoutes.post('/login', login);

app.use(apiRoutes);

module.exports = app;