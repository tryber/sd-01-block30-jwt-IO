const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'images')));

app.use('/users', routes.createUser);
app.use('/login', routes.login);
app.use('/products', routes.products);
app.use('/purchases', routes.purchases);
app.use('/images', routes.images);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.listen(port);
console.log(`Conectado na porta ${port}`);
