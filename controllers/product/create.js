const Product = require('../../models/product');
const rescue = require('../rescue');

const FILE_NAME = 'products';

const create = async (req, res) => {
  const { name, description, price } = req.body;
  const productData = {
    name,
    description,
    price,
  };
  Product.save(productData, FILE_NAME).then((product) => {
    res.status(201).json(product);
  });
};

module.exports = rescue(create);
