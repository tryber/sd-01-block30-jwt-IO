const express = require('express');
const controllers = require('./controllers');
const auth = require('./middleware/auth');
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

apiRoutes.post('/products', authMiddleware, controllers.products.create);
apiRoutes.put('/products/:id', authMiddleware, controllers.products.update);
apiRoutes.post('/images', authMiddleware, upload.single('image'), controllers.products.images);
apiRoutes.get('/products/:id', controllers.products.readOne);
apiRoutes.get('/products', controllers.products.readAll);
apiRoutes.delete('/products/:id', authMiddleware, controllers.products.remove);

apiRoutes.post('/purchases', authMiddleware, controllers.purchases.create);
apiRoutes.put('/purchases/:id', authMiddleware, controllers.purchases.update);
apiRoutes.get('/purchases/:id', authMiddleware, controllers.purchases.readOne);
apiRoutes.get('/purchases', authMiddleware, controllers.purchases.readAll);
apiRoutes.delete('/purchases/:id', authMiddleware, controllers.purchases.remove);

app.use(apiRoutes);

app.listen(port);
console.log('Conectado na porta ' + port);
