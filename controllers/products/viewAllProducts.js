const Products = require('../../models/products');

module.exports = async (req, res) => {
  const productList = await Products.viewAllProducts();
  return res.status(200).json(productList);
};
