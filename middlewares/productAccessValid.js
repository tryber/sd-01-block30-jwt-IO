const jwt = require('jsonwebtoken');

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

function authorizationValidMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'no auth token provided' });

  const payload = jwt.verify(token, 'senha');

}

module.exports = { productAccessMiddleware };

