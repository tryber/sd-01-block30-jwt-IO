const { getData, setData } = require('./utils');
const { v1: uuidv1 } = require('uuid');

const FILE_NAME = 'purchase';
const FILE_PRODUCT = 'products';
const FILE_USER = 'users';

const findOne = async (id) => {
  const purchases = await getData(FILE_NAME);
  const purchase = purchases
    .find((purchase) => purchase.id === id);
  if (!purchase) return false;
  return purchase;
};

const isExists = async (id, type) => {
  const data = await getData(type);
  return data.some((entidade) => entidade.id === id);
};

const isValidQuantity = (quantity) => {
  return quantity > 0 && typeof quantity === 'number' && Number.isInteger(quantity);
};

const validUpdate = ({ userID }) => {
  if (!userID) return false;
  if (!isExists(userID, FILE_USER)) return false
  return true
}

const validPurchase = ({ productId, quantity }) => {
  if (!productId || !quantity) return false;
  if (!isValidQuantity(quantity)) return false;
  if (!isExists(productId, FILE_PRODUCT)) return false;
  return true;
};

const addPurchase = async (obj) => {
  const data = await getData(FILE_NAME);
  const objId = { ...obj, id: uuidv1() };
  const newArray = [...data, objId];
  await setData(FILE_NAME, newArray);
  return objId;
};

const updatePurchase = async (obj, id) => {
  const searchPurchase = await findOne(id);
  if (!searchPurchase) return false;
  const newArray = [...deletePurchase(id), { ...obj, id: searchPurchase.id }];
  await setData(FILE_NAME, newArray);
  return { ...obj, id: searchPurchase.id };
};

const deletePurchase = async (id) => {
  const searchPurchase = findOne(id);
  if (!searchPurchase) return false;
  const purchases = await getData(FILE_NAME);
  const newArray = purchases.filter((purchase) => (
    searchPurchase.id !== purchase.id
  ));
  await setData(FILE_NAME, newArray);
  return newArray;
};

const verifyUserPurchase = async (userID, id) => {
  const data = await getData(FILE_NAME);
  const purchase = data.find(purchase => purchase.id === id);
  if (!purchase) return false;
  return (purchase.userID === userID);
};

const getPurchase = async (userID, id) => {
  const data = await getData(FILE_NAME);
  return data.filter(purchase => purchase.userID === userID)
    .find(purchaseUser => purchaseUser.id === id);
};

const getAllPurchase = async (userID) => {
  const data = await getData(FILE_NAME);
  return data.filter(purchase => purchase.userID === userID);
};

const Purchase = {
  validPurchase,
  validUpdate,
  delete: deletePurchase,
  update: updatePurchase,
  save: addPurchase,
  getAll: getAllPurchase,
  getOne: getPurchase,
  verifyUser: verifyUserPurchase,
};

module.exports = Purchase;
