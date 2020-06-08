const Products = require('../../models/products');

module.exports = async (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  if (!productId) return res.status(400).json({ message: 'Parâmetro Inválido!' });
  if (!product) return res.status(400).json({ message: 'Parâmetro Inválido!' });
  return Products.updateProducts(productId, product).then(() => res.status(200).json({ message: 'Atualizado com sucesso!' }));
};
