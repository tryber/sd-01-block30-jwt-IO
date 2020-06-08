const Products = require('../../models/products');

module.exports = async (_req, res) => {
  const productList = await Products.viewAllProducts();
  return res.status(200).json(productList);
};
