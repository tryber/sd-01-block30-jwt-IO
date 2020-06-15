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

module.exports = { validProductMiddleware };
