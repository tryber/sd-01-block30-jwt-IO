const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const { secret } = require('../secret');
const { readFileJson } = require('../fs-functions');

async function productIdValid(productId = '') {
  const fileProductsJson = await fs.readFile(path.resolve(__dirname, '..', 'products.json'), 'utf8');
  const productExists = JSON.parse(fileProductsJson);
  return productExists.find(({ id }) => id === productId);
}

function productQuantity(quantity = '') {
  return Number.isInteger(quantity) && quantity > 0;
}

async function userIdValid(userID = '') {
  const userExists = await readFileJson('users');
  return userExists.find(({ id }) => id === userID);
}

function isTokenValid(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

async function increaseNewPurchase(req, res, next) {
  const { productId, quantity } = req.body;

  if (!(await productIdValid(productId)) || !productQuantity(quantity))
    return res.status(400).json({ message: 'ProductId or quantity invalid' });

  next();
}

async function updatePurchase(req, res, next) {
  const { userID, productId, quantity } = req.body;
  const token = req.headers.authorization;
  const { id: idUser } = isTokenValid(token);

  if (userID !== idUser) return res.status(401).json({ message: 'UserID is not allowed' });

  if (!(await userIdValid(userID)) || !(await productIdValid(productId)))
    return res.status(400).json({ message: 'ProductId or userID invalid' });

  if (!productQuantity(quantity))
    return res.status(400).json({ message: 'Quantity invalid' });

  next();
}

async function excludePurchase(req, res, next) {
  const token = req.headers.authorization;
  const { id: idPurchase } = req.params;

  const { id: idUser } = isTokenValid(token);

  const filePurchases = await readFileJson('purchases');
  const findIdPurchases = filePurchases
    .find(({ id, userID }) => id === idPurchase && userID === idUser);

  if (!findIdPurchases)
    return res.status(400).json({ message: 'Invalid data' });

  const productId = await readFileJson('products');
  const productIdExist = productId.find(({ id }) => id === findIdPurchases.productId);

  if (!productIdExist) return res.status(400).json({ message: 'ProductId not found' });

  next();
}

function authorizationValidMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'No auth token provided' });

  const payload = isTokenValid(token);

  if (!userIdValid(payload.id))
    return res.status(403).json({ message: 'Access Denied' });

  next();
}

module.exports = {
  authorizationValidMiddleware,
  excludePurchase,
  increaseNewPurchase,
  isTokenValid,
  updatePurchase,
};
