const { v4: uuidv4 } = require('uuid');
const { getFile, writeFile, findByParam } = require('../service/files');

const Product = {
  allProducts: async () => {
    const products = await getFile('products.json');
    return products;
  },
  findById: id => findByParam('products.json', id, 'id'),
  addProduct: async (product) => {
    const products = await getFile('products.json');
    const newProduct = { ...product, id: uuidv4() };
    products.push(newProduct);

    await writeFile(products, 'products.json');
    return newProduct;
  },
  updateProduct: async (product, id) => {
    const products = await getFile('products.json');
    const newProducts = products.filter(each => each.id !== id);
    const newProduct = { ...product, id };
    newProducts.push(newProduct);
    console.log("newProduct", newProduct)
    await writeFile(newProducts, 'products.json');
  },
  deleteProduct: async (id) => {
    const products = await getFile('products.json');
    const newProducts = products.filter(each => each.id !== id);

    await writeFile(newProducts, 'products.json');
  },
};

module.exports = Product;
