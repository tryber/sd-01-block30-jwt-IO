const express = require('express');

const routes = require('./routes');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

const JWT_SECRET = 'itsasecret';

const apiRoutes = express.Router();
apiRoutes.post('/users', routes.createUsers);
apiRoutes.post('/login', routes.login(JWT_SECRET))

app.use(apiRoutes);

app.listen(port);
console.log('Conectado na porta ' + port);
