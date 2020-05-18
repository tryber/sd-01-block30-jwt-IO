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
  const resultProduct = await Product.save(productData, FILE_NAME)
  res.status(201).json(resultProduct);
};

module.exports = rescue(create);
