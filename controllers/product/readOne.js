const Product = require('../../models/product');
const rescue = require('../rescue');

const readOne = async (req, res) => {
  const { id } = req.params;
  Product.getOne({ id }).then((product) => {
    res.status(200).json(product);
  });
};

module.exports = rescue(readOne);
