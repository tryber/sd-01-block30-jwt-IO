const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const { users, login, products, purchases, images } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'images')));

app.use(users);
app.use(login);
app.use(products);
app.use(purchases);
app.use(images);

module.exports = app;
