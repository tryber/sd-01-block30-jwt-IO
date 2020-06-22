const fs = require('fs').promises;
const path = require('path');

const { readFileJson } = require('../fs-functions');

async function isProductValid(productId = '') {
  const productIdExists = await readFileJson('products');
  const findProductId = productIdExists.find(file => file.id === productId);
  return findProductId;
}

function isTextValid(image = '') {
  const regex = /^.+\.((png)|(jpg))$/;
  return regex.test(image);
}

async function isFolderImageValid(fileName = '') {
  const file = await fs.readdir(path.resolve(__dirname, '..', 'images'), 'utf8');
  return file.includes(`${fileName}.png`);
}

async function validImageMiddleware(req, res, next) {
  const { productId } = req.body;

  console.log(productId)

  if (!req.file) return res.status(400).json({ message: 'Missing file' });

  if (!(await isProductValid(productId))) return res.status(401).json({ message: 'Invalid productId' });

  const { fieldname, originalname } = req.file;
  if (fieldname !== 'image' || !isTextValid(originalname))
    return res.status(422).json({ message: 'File is not format .jpg or .png' });

  if (await isFolderImageValid(productId)) return res.status(409).json({ message: 'File already exists' });

  next();
}

module.exports = { validImageMiddleware };
