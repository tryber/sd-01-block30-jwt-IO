const express = require('express');

const router = express.Router();

const rescue = require('../service/rescue');

const Purchases = require('../models/purchases');

const validateTokenPurchases = require('../middlewares/purchases');

const User = require('../models/users');

const callBackDoPurchases = async (req, res) => {
  const { productId, quantity, userID } = req.body;

  const {
    data: { id },
  } = req.user;

  const user = User.getById(id);

  if (userID !== user.id)
    return res.status(401).json({ message: 'Não autorizado' });

  const product = new Purchases(id, productId, quantity);
  await product.addPurchase(productId).then(body => {
    const { image, ...product } = body;
    return res.status(201).json(product);
  });
};

// const callBackGetAllProducts = async (_req, res) => {
//   const products = await Products.getAllProducts();
//   if (!products)
//     return res.status(400).json({ message: 'Não existe cadastrados produtos' });
//   return res.status(200).json(products);
// };

// const callBackGetOneProductsForID = async (req, res) => {
//   const { id } = req.params;
//   const oneUser = await Products.getByIdProducts(id);
//   if (!oneUser) return res.status(400).json({ message: 'produto não exite' });
//   return res.status(200).json(oneUser);
// };

// const callBackDeleteOneProductsForID = async (req, res) => {
//   const { id } = req.params;
//   const oneUser = await Products.deleteProducts(id);
//   if (!oneUser) return res.status(400).json({ message: 'produto não exite' });
//   return res.status(200).json(oneUser);
// };

// const callBackPutOneProductsForID = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, image } = req.body;
//   console.log('name', name);
//   const product = new Products(name, description, price, image);
//   const oneUser = await product.addOrUpdateProducts(id);
//   if (!oneUser) return res.status(400).json({ message: 'produto não exite' });
//   return res.status(200).json(oneUser);
// };

router.post(
  '/purchases',
  rescue(validateTokenPurchases),
  rescue(callBackDoPurchases),
);
// router.get('/products', rescue(callBackGetAllProducts));
// router.get('/products/:id', rescue(callBackGetOneProductsForID));
// router.put(
//   '/products/:id',
//   rescue(validateToken),
//   rescue(callBackPutOneProductsForID),
// );
// router.delete(
//   '/products/:id',
//   rescue(validateToken),
//   rescue(callBackDeleteOneProductsForID),
// );

module.exports = router;
