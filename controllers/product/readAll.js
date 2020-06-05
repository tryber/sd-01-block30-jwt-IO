const Product = require('../../models/product');
const rescue = require('../rescue');

const readAll = async (req, res) => {
  Product.getAll().then((listProduct) => {
    res.status(200).json(listProduct);
  });
};

module.exports = rescue(readAll);
