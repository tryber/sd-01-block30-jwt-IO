const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const {
  validateToken,
  validateRole,
  validateProduct,
  validateProductId,
} = require('../middleware/productValidation');
const { validatePurchase, validatePurchaseId, validateUserPurchase } = require('../middleware/purchaseValidation');

const app = express();

app.use(cors());
app.use(express.json());

const apiRoutes = express.Router();

// USERS
apiRoutes.post('/users', routes.users.createUsers);

// LOGIN
apiRoutes.post('/login', routes.users.login);

// PRODUCTS
apiRoutes.get('/products', routes.products.viewAllProducts);
apiRoutes.get('/products/:id', validateProductId, routes.products.viewProducts);
apiRoutes.post('/products', validateToken, validateRole, validateProduct, routes.products.createProducts);
apiRoutes.delete('/products/:id', validateToken, validateRole, validateProductId, routes.products.deleteProducts);
apiRoutes.put('/products/:id', validateToken, validateRole, validateProductId, validateProduct, routes.products.updateProducts);

// PURCHASES
apiRoutes.get('/purchases', validateToken, routes.purchases.viewAllPurchases);
apiRoutes.get('/purchases/:id', validateToken, validatePurchaseId, routes.purchases.viewPurchases);
apiRoutes.post('/purchases', validateToken, validatePurchase, routes.purchases.createPurchases);
apiRoutes.delete('/purchases/:id', validateToken, validatePurchaseId, validateUserPurchase, routes.purchases.deletePurchases);
apiRoutes.put('/purchases/:id', validateToken, validatePurchaseId, validatePurchase, validateUserPurchase, routes.purchases.updatePurchases);

app.use(apiRoutes);
app.use((err, _req, res, _next) => res.status(500).json({ message: err.message }));

module.exports = app;
