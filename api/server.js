const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', routes.createUsers);
app.use('/login', routes.login);

app.listen(port);
console.log('Conectado na porta ' + port);
