const Product = require('../../models/product');
const path = require('path');
const fs = require('fs').promises;

const EMPLOYEE = 'funcionario';
const rescue = require('../rescue');

const updateImage = async (req, res) => {
  const { role } = req.user;
  if (role !== EMPLOYEE) return res.status(401).json({ message: 'Não autorizado' });
  console.log(req.body.productId, 'body');
  if (!req.body.productId) return res.status(422).json({ message: 'Dados invalidos' });
  const product = await Product.getOne({ id: req.body.productId });
  console.log(product, 'product');
  if (!product) return res.status(422).json({ message: 'Dados invalidos' });

  const newFileName = path.resolve(__dirname, '..', '..', 'images', req.file.originalname);
  await fs.writeFile(newFileName, req.file.buffer);
  const productUpdate = await Product.update({ ...product, image: `http://localhost:3000/${req.file.originalname}` });

  res.status(200).json(productUpdate);
};

module.exports = rescue(updateImage);
