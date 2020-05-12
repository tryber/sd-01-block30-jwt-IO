const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const apiRoutes = express.Router();
app.use('/users', routes.createUser);
// apiRoutes.post('/login', routes.login)

// app.use(apiRoutes);

app.listen(port);
console.log('Conectado na porta ' + port);
