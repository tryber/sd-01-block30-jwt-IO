const Product = require('../../models/product');
const rescue = require('../rescue');
const EMPLOYEE = 'funcionario';

const create = async (req, res) => {
  const { name, description, price } = req.body;
  const { role } = req.user;
  if (role !== EMPLOYEE) return res.status(401).json({ message: 'Não autorizado' })
  
  if (!Product.validProduct(req.body)) {
    return res.status(422).json({ message: 'Dados inválidos' });
  }

  const productData = {
    name,
    description,
    price,
  };

  Product.save(productData).then((product) => {
    res.status(201).json(product);
  })
};

module.exports = rescue(create)
