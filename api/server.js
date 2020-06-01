const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
  return res.status(200).json({ message: 'essa porra tá funfando ou não?'});
});

apiRoutes.post('/users', routes.createUsers);
apiRoutes.post('/login', routes.login)

app.use(apiRoutes);

module.exports = app;
