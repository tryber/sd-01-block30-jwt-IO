const Product = require('../../models/product');
const rescue = require('../rescue');

const remove = async (req, res) => {
  const { id } = req.params;
  Product.delete({ id }).then(() => {
    res.status(204).end();
  });
};

module.exports = rescue(remove);
