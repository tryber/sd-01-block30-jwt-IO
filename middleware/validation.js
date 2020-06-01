const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Products = require('../models/products');

const secret = 'abc';

async function validateToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    const user = await User.findByUsername(payload.data);

    if (!user) return res.status(401).json({ message: 'invalid token user' });
    req.user = payload.data;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function validateRole(req, res, next) {
  try {
    if (!User.validateRole(req.user)) return res.status(401).json({ message: 'Usuário sem permissão.' });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function validateProduct(req, res, next) {
  try {
    if (!req.body.name || !req.body.price) return res.status(400).json({ message: 'Dados incompletos' });
    if (!Products.validateProduct(req.body)) return res.status(400).json({ message: 'Dados incorretos' });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { validateToken, validateRole, validateProduct };
