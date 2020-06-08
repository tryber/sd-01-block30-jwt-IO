const utils = require('./utils');
const fs = require('fs').promises;
const path = require('path');

const nameRegex = /[a-z0-9]*[A-Z0-9]*/g;

function validateProduct({ name, price }) {
  if (name.length < 5 || !name.match(nameRegex)) return false;
  if (isNaN(price) || price <= 0) return false;
  return true;
}

async function viewAllProducts() {
  const productData = await utils.getData('products');
  return productData;
}

async function viewProducts(productId) {
  return (await viewAllProducts()).find(item => item.id === productId);
}

async function createProducts(product) {
  const item = utils.addItemWithId('products', product);
  return item;
}

async function deleteProducts(productId) {
  const productList = (await viewAllProducts()).filter(item => item.id !== productId);
  utils.setData('products', productList);
  return productList;
}

async function updateProducts(productId, newProduct) {
  await deleteProducts(productId);
  utils.addItemWithId('products', newProduct, productId);
}

async function saveImage(imageFile, productId) {
  const fileType = imageFile.originalname.split('.')[1];
  const imagePath = path.resolve(__dirname, '..', 'images', `${productId}.${fileType}`);
  await fs.writeFile(imagePath, imageFile.buffer);
  return fileType;
}

async function setImage({ productId, image }) {
  const product = (await viewAllProducts()).find(item => item.id === productId);
  const fileType = await saveImage(image, productId);
  const imageObj = { ...image, originalname: `${productId}.${fileType}` };
  product.image = imageObj.originalname;
  await updateProducts(productId, product);
  return { image: `localhost:8080/${imageObj.originalname}` };
}

const Products = {
  viewAllProducts,
  viewProducts,
  createProducts,
  deleteProducts,
  updateProducts,
  validateProduct,
  setImage,
};

module.exports = Products;
