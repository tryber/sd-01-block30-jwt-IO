const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const { secret } = require('../config');

function productNameValid(name = '') {
  const regex = /^([a-zA-Z0-9 _-]+)$/;
  return name.length >= 5 && regex.test(name);
}

function productPriceValid(price = '') {
  return typeof price === 'number' && price > 0;
}

function productAccessMiddleware(req, res, next) {
  const { name, description, price } = req.body;

  if (!productNameValid(name) || !productPriceValid(price) || !description)
    return res.status(400).json({ message: 'Nome ou preço inválido' });

  next();
}

async function authorizationValidMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'no auth token provided' });
  console.log('passou aqui')

  const { payload } = jwt.verify(token, secret);

  const fileUsers = await fs.readFile(path.resolve(__dirname, '..', 'users.json'), 'utf-8');
  const parseFileUsers = JSON.parse(fileUsers);
  const user = parseFileUsers
    .find(({username}) => username === payload.username && username === 'funcionario');

  if (!user) return res.status(401).json({ message: 'invalid token user' });

  next();
}

module.exports = { productAccessMiddleware, authorizationValidMiddleware };
