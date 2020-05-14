const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', routes.createUser);
app.use('/login', routes.login);
app.use('/products', routes.products);
app.use('/purchases', routes.purchases);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

module.exports = app;
