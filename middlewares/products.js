const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const { secret } = require('../secret');

function productName(name = '') {
  const regex = /[a-zA-Z0-9]+/;
  return regex.test(name) && name.length >= 5;
}

function productPrice(price = '') {
  return typeof price === 'number' && price > 0;
}

function validProductMiddleware(req, res, next) {
  const { name, price, description } = req.body;
  if (!productName(name) || !productPrice(price) || !description)
    return res.status(400).json({ message: 'Invalid Product Fields' });

  next();
}

async function authorizationValidMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'No auth token provided' });

  const payload = jwt.verify(token, secret);

  const fileUsers = await fs.readFile(path.resolve(__dirname, '..', 'users.json'), 'utf-8');
  const parseUsers = JSON.parse(fileUsers);
  const user = parseUsers
    .find(({ username, role }) => username === payload.username && role === payload.role);

  if (!user || payload.role !== 'funcionario')
    return res.status(403).json({ message: 'Access denied' });

  next();
}

module.exports = {
  validProductMiddleware,
  authorizationValidMiddleware,
};
