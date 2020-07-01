
const productNameValid = (name = '') => {
  const regex = /^([a-zA-Z0-9 _-]+)$/;
  return name.length >= 5 && regex.test(name);
}

const productPriceValid = (price = '') => typeof price === 'number' && price > 0;

const productAccess = (req, res, next) => {
  const { name, description, price } = req.body;
  if (!productNameValid(name) || !productPriceValid(price) || !description)
    return res.status(400).json({ message: 'Name or price invalid' });
  next();
}

async function authorizationValid(req, res, next) {
  const { role } = req.user;
  console.log('user', req.user)
  if (role !== 'funcionario')
    return res.status(403).json({ message: 'Access denied' });

  next();
}

module.exports = { productAccess, authorizationValid };
