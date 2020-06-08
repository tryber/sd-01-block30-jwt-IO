const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const express = require('express');

const Product = require('../models/product');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const writing = async content =>
  fs.writeFile(
    path.resolve(__dirname, '..', 'products.json'),
    JSON.stringify(content),
    err => {
      if (err) throw err;
    }
  );

function validateData({ originalname, fieldname }, productId) {
  return /^.+.((png)|(jpg))$/.test(originalname) || fieldname !== "image" || !productId;
}

router.post('/', upload.single('image'), async (req, res) => {
  if (req.decoded.role !== 'funcionario')
    return res.status(401).send({ message: 'Unauthorized' });
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(422).send({ message: "invalid id" });
  if (!validateData(req.file, productId)) return res.status(422).send({ message: "invalid data" });
  const productURL = `http:/localhost:8080/${productId}.png`
  const products = await Product.allProducts();
  const newProducts = products.map(each => {
    if (each.id === productId) {
      each.image = productURL;
    }
    return each;
  });

  await writing(newProducts);
  const newFileName = path.resolve(__dirname, '..', 'images', `${productId}.png`);
  await fs.writeFile(newFileName, req.file.buffer);
  res.status(201).json({ image: productURL });
});
module.exports = router;
