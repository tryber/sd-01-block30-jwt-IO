const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

const apiRoutes = express.Router();
apiRoutes.post('/users', routes.createUsers);
apiRoutes.post('/login', routes.login)

app.use(apiRoutes);
app.use((err, _req, res, _next) => res.status(500).json({ message: err.message }));

module.exports = app;
