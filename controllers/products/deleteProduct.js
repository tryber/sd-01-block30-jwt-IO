const Products = require('../../models/products');

module.exports = async (req, res) => {
  const productId = req.params.id;
  if (!productId) return res.status(400).json({ message: 'Parâmetro Inválido!' });
  return Products.deleteProducts(productId).then(() => res.status(200).json({ message: 'Excluído com sucesso!' }));
};
