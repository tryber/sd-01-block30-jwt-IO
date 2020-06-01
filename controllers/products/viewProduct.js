const Products = require('../../models/products');

module.exports = async (req, res) => {
  return Products.viewProducts(req.params.id).then(product => res.status(200).json(product));
};
