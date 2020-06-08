const Products = require('../../models/products');

module.exports = async (req, res) => {
  const productId = req.body.productId;
  const image = req.file;
  if (!productId || !image) return res.status(400).json({ message: 'Parâmetro Inválido!' });
  return Products.setImage({ productId, image }).then(image => res.status(201).json(image));
};
