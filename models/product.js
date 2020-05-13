const { getData, setData } = require('./utils');
const { v1: uuidv1 } = require('uuid');

const FILE_NAME = 'product';

const isValidName = (name) => {
  const nameRegex = /[a-z0-9]*[A-Z0-9]*/g;
  return name.match(nameRegex)
    && name.length >= 5;
}

const isEmployee = ({ role }) => role === 'funcionario';

const isValidPrice = (price) => {
  const priceRegex = /[0-9]*/g;
  return price.match(priceRegex)
    && (Number(price) > 0);
}

const validProduct = ({ price, name, description }) => {
  if (!price || !name || !description) return false;
  if (!isValidName(name)) return false;
  if (!isValidPrice(price)) return false;
  return true;
}

const addProduct = async (obj) => {
  const data = await getData(FILE_NAME);
  const objId = { ...obj, id: uuidv1() };
  const newArray = [...data, objId];
  return setData(FILE_NAME, newArray)
}

const findOne = async ({ id, name }) => {
  const data = await getData(FILE_NAME);
  const key = (id) ? 'id' : 'name';
  const value = (id) ? id : name;
  const product = data.find((obj) => (
    obj[key] === value
  ));
  return product;
}

const deleteProduct = async (obj) => {
  const searchProduct = await findOne(obj);
  if (!searchProduct) return false;
  const products = await getData(FILE_NAME);
  const newArray = products.filter((product) => (
    searchProduct.id !== product.id
  ));
  return setData(FILE_NAME, newArray);
}

const updateProduct = async (obj) => {
  const searchProduct = await findOne(obj);
  if (!searchProduct) return false;
  const products = await getData(FILE_NAME);
  const newArray = [...products.filter((product) => (
    searchProduct.id !== product.id
  )), obj];
  return setData(FILE_NAME, newArray);
}

const getAllProduct = async () => {
  return getData(FILE_NAME);
}

const Product = {
  validProduct,
  isEmployee,
  delete: deleteProduct,
  update: updateProduct,
  save: addProduct,
  getAll: getAllProduct,
  findOne,
};

module.exports = Product;
