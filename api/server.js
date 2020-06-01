const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { validateToken, validateRole, validateProduct } = require('../middleware/validation');

const app = express();

app.use(cors());
app.use(express.json());

const apiRoutes = express.Router();
apiRoutes.post('/users', routes.users.createUsers);
apiRoutes.post('/login', routes.users.login);
apiRoutes.get('/products', routes.products.viewAllProducts);
apiRoutes.get('/products/:id', routes.products.viewProducts);
apiRoutes.post('/products', validateToken, validateRole, validateProduct, routes.products.createProducts);

app.use(apiRoutes);
app.use((err, _req, res, _next) => res.status(500).json({ message: err.message }));

module.exports = app;
