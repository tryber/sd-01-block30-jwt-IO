const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const { secret } = require('../config');
const { readFileJson } = require('../modifyFile');

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

async function increaseNewPurchase(req, res, next) {
  const { productId, quantity } = req.body;

  if (!(await productIdValid(productId)) || !productQuantity(quantity))
    return res.status(400).json({ message: 'ProductId or quantity invalid' });

  next();
}

async function updatePurchase(req, res, next) {
  const { userID, productId, quantity } = req.body;

  if (!(await userIdValid(userID)) || !(await productIdValid(productId)))
    return res.status(400).json({ message: 'ProductId or userID invalid' });

  if (!productQuantity(quantity))
    return res.status(400).json({ message: 'Quantity invalid' });

  next();
}

async function excludePurchase(req, res, next) {
  const { userID, id: idPurchase } = req.params;

  const filePurchases = await readFileJson('purchases');
  const findIdPurchases = filePurchases.find(({ id }) => id === idPurchase);

  if (!userIdValid(userID) || !findIdPurchases)
    return res.status(400).json({ message: 'Invalid data' });

  const productId = await readFileJson('products');
  const productIdExist = productId.find(({ id }) => id === findIdPurchases.productId);

  if (!productIdExist) return res.status(400).json({ message: 'ProductId not found' });

  next();
}

function authorizationValidMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const { userID } = req.params;

  if (!token) return res.status(401).json({ message: 'No auth token provided' });

  const { payload } = jwt.verify(token, secret);

  if (userID !== payload.id || !userIdValid(userID))
    return res.status(403).json({ message: 'Access Denied' });

  next();
}

module.exports = {
  increaseNewPurchase,
  updatePurchase,
  excludePurchase,
  authorizationValidMiddleware,
};