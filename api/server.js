const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();
apiRoutes.post('/users', routes.createUsers);
apiRoutes.post('/login', routes.login)

app.use(apiRoutes);

// app.listen(port);

module.exports = app;

// console.log('Conectado na porta ' + port);
