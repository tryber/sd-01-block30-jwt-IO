const express = require('express');
const bodyParser = require('body-parser');
const { users, login, products } = require('./routes');
//const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(users)
app.use(login)
app.use(products)

module.exports = app;
