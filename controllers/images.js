const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const express = require('express');

const router = express.Router();

const { authorizationValidMiddleware } = require('../middlewares/products');
const { validImageMiddleware } = require('../middlewares/images');
const Image = require('../models/imageModel');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authorizationValidMiddleware);

router.post('/', upload.single('image'), validImageMiddleware, async (req, res) => {
  const { productId } = req.body;

  const newFileName = path.resolve(__dirname, '..', 'images', `${productId}.png`);
  await fs.writeFile(newFileName, req.file.buffer);

  const products = new Image(`http://localhost:3000/${productId}.png`);
  const increaseProducts = await products.increase(productId);

  res.status(201).json({ image: increaseProducts });
});

module.exports = router;
