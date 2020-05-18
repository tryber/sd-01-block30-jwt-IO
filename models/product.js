const { getData, setData, addItem } = require('./utils');

const FILE_NAME = 'products';

const isValidName = (name) => {
  const nameRegex = /[a-z0-9]*[A-Z0-9]*/g;
  return name.match(nameRegex)
    && name.length >= 5;
};

const isEmployee = ({ role }) => role === 'funcionario';

const isValidPrice = (price) => {
  return (typeof price === 'number' && price > 0);
};

const validProduct = ({ price, name, description }) => {
  if (!price || !name || !description) return false;
  if (!isValidName(name)) return false;
  if (!isValidPrice(price)) return false;
  return true;
};

const findOne = async ({ id }) => {
  const data = await getData(FILE_NAME);
  const product = data.find((obj) => (
    obj.id === id
  ));
  return product;
};

const deleteProduct = async (obj) => {
  const searchProduct = await findOne(obj);
  if (!searchProduct) return false;
  const products = await getData(FILE_NAME);
  const newArray = products.filter((product) => (
    searchProduct.id !== product.id
  ));
  return setData(FILE_NAME, newArray);
};

const updateProduct = async (obj) => {
  const searchProduct = await findOne(obj);
  if (!searchProduct) return false;
  const products = await getData(FILE_NAME);
  const newArray = [...products.filter((product) => (
    searchProduct.id !== product.id
  )), obj];
  await setData(FILE_NAME, newArray);
  return obj;
};

const getAllProduct = async () => {
  return getData(FILE_NAME);
};

const Product = {
  validProduct,
  isEmployee,
  delete: deleteProduct,
  update: updateProduct,
  save: addItem,
  getAll: getAllProduct,
  getOne: findOne,
};

module.exports = Product;
