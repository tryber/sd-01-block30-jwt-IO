const Product = require('../../models/product');
const EMPLOYEE = 'funcionario';
const rescue = require('../rescue'); 

const update = async (req, res) => {
  const { name, description, price } = req.body;
  const { role } = req.user;
  const { id } = req.params;
  if (role !== EMPLOYEE) return res.status(401).json({ message: 'Não autorizado' })

  if (!Product.validProduct(req.body)) {
    return res.status(422).json({ message: 'Dados inválidos' });
  }

  const productData = {
    id,
    name,
    description,
    price,
  };

  Product.update(productData).then((product) => {
    res.status(200).json(product);
  });
};

module.exports = rescue(update);
