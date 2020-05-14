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
    return res.status(400).json({ message: 'Name or price invalid' });

  next();
}

async function authorizationValidMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'No auth token provided' });

  const { payload } = jwt.verify(token, secret);

  const fileUsers = await fs.readFile(path.resolve(__dirname, '..', 'users.json'), 'utf-8');
  const parseFileUsers = JSON.parse(fileUsers);
  console.log(parseFileUsers)
  const user = parseFileUsers
    .find(({ username, role }) => username === payload.username && role === 'funcionario');

  if (!user) return res.status(403).json({ message: 'Access denied' });

  next();
}

module.exports = { productAccessMiddleware, authorizationValidMiddleware };
