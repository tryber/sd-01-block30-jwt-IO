const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'images')));

app.use('/users', routes.createUsers);
app.use('/login', routes.login);
app.use('/products', routes.products);
app.use('/purchases', routes.purchases);
app.use('/images', routes.images);

app.listen(port);
console.log('Conectado na porta ' + port);
