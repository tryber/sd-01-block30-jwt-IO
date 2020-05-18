const express = require('express');
const controllers = require('./controllers');
const auth = require('./middleware/auth');
const middleValidBody = require('./middleware/middleValidBody')
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

apiRoutes.use(express.static(path.resolve(__dirname, 'images')));

const storage = multer.memoryStorage();
const upload = multer({ storage });

apiRoutes.post('/users', controllers.users.create);
apiRoutes.post('/login', controllers.users.login(JWT_SECRET));

apiRoutes.post('/products', token, authMiddleware, middleRole, middleValidBody('product'), controllers.products.create);
apiRoutes.put('/products/:id', token, authMiddleware, middleRole, middleValidBody('product'), controllers.products.update);
apiRoutes.post('/images', token, authMiddleware, middleRole, upload.single('image'), controllers.products.images);
apiRoutes.get('/products/:id', controllers.products.readOne);
apiRoutes.get('/products', controllers.products.readAll);
apiRoutes.delete('/products/:id', token, authMiddleware, middleRole, controllers.products.remove);

apiRoutes.post('/purchases', token, authMiddleware, middleValidBody('purchase'), controllers.purchases.create);
apiRoutes.put('/purchases/:id', token, authMiddleware, middleValidBody('purchase'), controllers.purchases.update);
apiRoutes.get('/purchases/:id', token, authMiddleware, controllers.purchases.readOne);
apiRoutes.get('/purchases', token, authMiddleware, controllers.purchases.readAll);
apiRoutes.delete('/purchases/:id', token, authMiddleware, controllers.purchases.remove);

app.use(apiRoutes);

app.listen(port);
console.log('Conectado na porta ' + port);
