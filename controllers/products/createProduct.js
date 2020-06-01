const Products = require('../../models/products');

module.exports = async (req, res) => {
  const product = req.body;
  if (!product) return res.status(400).json({ message: 'Inválido!' });
  return Products.createProducts(product).then((item) => res.status(201).json(item));
};
