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

  if (!req.file)
    return res.status(400).json({ message: 'Missing file' });

  const { fieldname, originalname } = req.file;
  if (!(await productIdValid(productId)))
    return res.status(401).json({ message: 'Invalid productId' });

  if (!imageTextValid(image) || fieldname !== 'image' || !imageTextValid(originalname))
    return res.status(422).json({ message: 'File or fileName is not document .jpg or .png' });

  if (await readFolderImages(image)) return res.status(409).json({ message: 'File already exists' });

  next();
}

module.exports = { imageValidMiddleware };
