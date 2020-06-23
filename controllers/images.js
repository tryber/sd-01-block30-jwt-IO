const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const rescue = require('../service/rescue');

const validateToken = require('../middlewares/products');

const path = require('path');

const Images = require('../models/images');

const multer = require('multer')

const storage = multer.memoryStorage();

const upload = multer({ storage });

const callBackDoImage = async (req, res) => {
  const { productId } = req.body;
  const newFileName = path.resolve(
    __dirname,
    '..',
    'images',
    `${productId}.png`,
  );

  const { buffer } = req.file;
  await fs.writeFile(newFileName, buffer);
  const products = new Images(`http://localhost:8080/${productId}.png`);
  const increaseProducts = await products.createImage(productId);
  res.status(201).json({ image: increaseProducts });
};

router.post(
  '/images',
  upload.single('image'),
  rescue(validateToken),
  rescue(callBackDoImage),
);

module.exports = router
