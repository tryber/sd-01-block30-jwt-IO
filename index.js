const express = require('express');
const controllers = require('./controllers');
const auth = require('./middleware/auth');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

const JWT_SECRET = 'itsasecret';

const apiRoutes = express.Router();
const authMiddleware = auth.factory(JWT_SECRET);

apiRoutes.post('/users', controllers.users.create);

apiRoutes.post('/login', controllers.users.login(JWT_SECRET));

app.use(apiRoutes);

app.listen(port);
console.log('Conectado na porta ' + port);
