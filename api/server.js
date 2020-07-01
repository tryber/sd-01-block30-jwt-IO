const express = require('express');
const bodyParser = require('body-parser');
const { createUsers, login, products, purchases, images } = require('./routes');
const verifyJWT = require('../middlewares/verifyJWT');
const path = require('path');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'images')));


app.use('/users', createUsers);
app.use('/login', login);
app.use('/product', verifyJWT, products);
app.use('/purchases', verifyJWT, purchases);
app.use('/images', verifyJWT, images);


app.use('*', (req, res) => res.status(404).json({message: 'page not found'}));

module.exports = app;
