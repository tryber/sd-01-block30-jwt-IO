const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const apiRoutes = express.Router();
app.use('/users', routes.createUser);
app.use('/login', routes.login);
app.use('/products', routes.products);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
})

// app.use(apiRoutes);

app.listen(port);
console.log('Conectado na porta ' + port);
