const Products = require('../../models/products');

module.exports = async (req, res) => (
  Products.viewProducts(req.params.id).then(item => res.status(200).json(item))
);
