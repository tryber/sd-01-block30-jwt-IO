const express = require('express');

const router = express.Router();

const rescue = require('../service/rescue');

const Products = require('../models/products');

const validateToken = require('../middlewares/products');

const readAndWrite = require('../service/readAndWrite');

const callBackCreateProducts = async (req, res) => {
  const { name, description, price, image } = req.body;
  const product = new Products(name, description, price, image);
  await product.addNewProducts().then(body => {
    const { image, ...product } = body;
    return res.status(201).json(product);
  });
};

const callBackGetAllProducts = async (_req, res) => {
  const products = await Products.getAllProducts();
  if (!products)
    return res.status(400).json({ message: 'Não existe cadastrados produtos' });
  return res.status(200).json(products);
};

const callBackGetProductsBarraID = async (req, res) => {
  const { id } = req.params;
  const oneUser = await Products.getByIdProducts(id);
  if (!oneUser) return res.status(400).json({ message: 'produto não exite' });
  return res.status(200).json(oneUser);
};

router.post('/products', rescue(validateToken), rescue(callBackCreateProducts));
router.get('/products', rescue(callBackGetAllProducts));
router.get('/products/:id', rescue(callBackGetProductsBarraID));

module.exports = router;
