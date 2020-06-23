const express = require('express');

const router = express.Router();

const rescue = require('../service/rescue');

const Products = require('../models/products');

const validateToken = require('../middlewares/products');

const callBackCreateProducts = async (req, res) => {
  const { name, description, price, image: imagens } = req.body;
  const products = new Products(name, description, price, imagens);
  await products.addNewProducts().then((body) => {
    const { image, ...product } = body;
    console.log(image);
    return res.status(201).json(product);
  });
};

const callBackGetAllProducts = async (_req, res) => {
  const products = await Products.getAllProducts();
  if (!products)
    return res.status(400).json({ message: 'Não existe cadastrados produtos' });
  return res.status(200).json(products);
};

const callBackGetOneProductsForID = async (req, res) => {
  const { id } = req.params;
  const oneUser = await Products.getByIdProducts(id);
  if (!oneUser) return res.status(400).json({ message: 'produto não exite' });
  return res.status(200).json(oneUser);
};

const callBackDeleteOneProductsForID = async (req, res) => {
  const { id } = req.params;
  const oneUser = await Products.deleteProducts(id);
  if (!oneUser) return res.status(400).json({ message: 'produto não exite' });
  return res.status(200).json(oneUser);
};

const callBackPutOneProductsForID = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;
  const product = new Products(name, description, price, image);
  const oneUser = await product.addOrUpdateProducts(id);
  if (!oneUser) return res.status(400).json({ message: 'produto não exite' });
  return res.status(200).json(oneUser);
};

router.post('/products', rescue(validateToken), rescue(callBackCreateProducts));
router.get('/products', rescue(callBackGetAllProducts));
router.get('/products/:id', rescue(callBackGetOneProductsForID));
router.put(
  '/products/:id',
  rescue(validateToken),
  rescue(callBackPutOneProductsForID),
);
router.delete(
  '/products/:id',
  rescue(validateToken),
  rescue(callBackDeleteOneProductsForID),
);

module.exports = router;
