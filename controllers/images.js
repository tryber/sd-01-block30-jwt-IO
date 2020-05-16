const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const express = require('express');

const router = express.Router();

const { authorizationValidMiddleware } = require('../middlewares/productAccessValid');
const { imageValidMiddleware } = require('../middlewares/imageValid');
const Image = require('../models/imageModel');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authorizationValidMiddleware);

router.post('/', upload.single('image'), imageValidMiddleware, async (req, res) => {
  const newFileName = path.resolve(__dirname, '..', 'images', req.body.image);
  await fs.writeFile(newFileName, req.file.buffer);

  const products = new Image(`http://localhost:3000/${req.body.image}`);
  const updateProducts = await products.update(req.body.productId);

  res.status(201).json({ image: updateProducts });
});

module.exports = router;
