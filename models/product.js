const { v4: uuidv4 } = require('uuid');
const { getFile, writing, findByParam } = require('../service.js');

const Product = {
  allProducts: async () => {
    const products = await getFile('products.json');
    return products;
  },
  addProduct: async (product) => {
    const products = await getFile('products.json');
    const newProduct = { ...product, id: uuidv4()};
    products.push(newProduct);

    await writing(products, 'products.json');
    return newProduct;
  },
  findById: (id) => {
    return findByParam('products.json', id, 'id');
  },
  updateProduct: async (product, id) => {
    const products = await getFile('products.json');
    const newProducts = products.filter(each => each.id !== id);
    const newProduct = { ...product, id: uuidv4()};
    newProducts.push(newProduct);

    await writing(newProducts, 'products.json');
  },
  deleteProduct: async (id) => {
    const products = await getFile('products.json');
    const newProducts = products.filter(each => each.id !== id);

    await writing(newProducts, 'products.json');
  },
};

module.exports = Product;
