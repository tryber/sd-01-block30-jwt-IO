const fs = require('fs').promises;
const path = require('path');

const { readFileJson } = require('../modifyFile');

async function productIdValid(productId = '') {
  const productIdExists = await readFileJson('products');
  const findProductId = productIdExists.find(file => file.id === productId);
  return findProductId;
}

function imageTextValid(image = '') {
  const regex = /^.+\.((png)|(jpg))$/;
  return regex.test(image);
}

async function readFolderImages(fileName = '') {
  const fileJson = await fs.readdir(path.resolve(__dirname, '..', 'images'), 'utf8');
  return fileJson.includes(fileName);
}

async function imageValidMiddleware(req, res, next) {
  const { productId, image } = req.body;
  const { fieldname, originalname } = req.file;

  if (!(await productIdValid(productId)))
    return res.status(401).json({ message: 'Invalid productId' });

  if (!imageTextValid(image) || fieldname !== 'image' || !imageTextValid(originalname))
    return res.status(401).json({ message: 'Invalid image name or image file' });

  if (await readFolderImages(image)) return res.status(401).json({ message: 'Image name unavailable' });

  next();
}

module.exports = { imageValidMiddleware };
