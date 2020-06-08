const express = require('express');
const bodyParser = require('body-parser');
const { users, login, products, purchases } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(users);
app.use(login);
app.use(products);
app.use(purchases);

module.exports = app;
