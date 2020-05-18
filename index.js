const express = require('express');
const controllers = require('./controllers');
const auth = require('./middleware/auth');
const authBody = require('./middleware/middleValidBody');
const token = require('./middleware/Token');
const middleRole = require('./middleware/middleRole');
const multer = require('multer');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

const JWT_SECRET = 'itsasecret';

const apiRoutes = express.Router();
const authMiddleware = auth.factory(JWT_SECRET);
const authProduct = authBody.valid('product');
const authPurchase = authBody.valid('purchase');
const authUser = authBody.valid('user');
const authToken = token.isExist;
const authRole = middleRole.valid;

apiRoutes.use(express.static(path.resolve(__dirname, 'images')));

const storage = multer.memoryStorage();
const upload = multer({ storage });

apiRoutes.post('/users', authUser, controllers.users.create);
apiRoutes.post('/login', controllers.users.login(JWT_SECRET));

apiRoutes.post('/products', authToken, authMiddleware, authRole, authProduct, controllers.products.create);
apiRoutes.put('/products/:id', authToken, authMiddleware, authRole, authProduct, controllers.products.update);
apiRoutes.post('/images', authToken, authMiddleware, authRole, upload.single('image'), controllers.products.images);
apiRoutes.get('/products/:id', controllers.products.readOne);
apiRoutes.get('/products', controllers.products.readAll);
apiRoutes.delete('/products/:id', authToken, authMiddleware, authRole, controllers.products.remove);

apiRoutes.post('/purchases', authToken, authMiddleware, authPurchase, controllers.purchases.create);
apiRoutes.put('/purchases/:id', authToken, authMiddleware, authPurchase, controllers.purchases.update);
apiRoutes.get('/purchases/:id', authToken, authMiddleware, controllers.purchases.readOne);
apiRoutes.get('/purchases', authToken, authMiddleware, controllers.purchases.readAll);
apiRoutes.delete('/purchases/:id', authToken, authMiddleware, controllers.purchases.remove);

app.use(apiRoutes);

app.listen(port);
console.log('Conectado na porta ' + port);
