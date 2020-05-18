const Product = require('../../models/product');
const rescue = require('../rescue');
// const EMPLOYEE = 'funcionario';

const remove = async (req, res) => {
  // const { role } = req.user;
  const { id } = req.params;
  // if (role !== EMPLOYEE) return res.status(401).json({ message: 'Não autorizado' })

  Product.delete({ id }).then(() => {
    res.status(204).end();
  })
};

module.exports = rescue(remove)
