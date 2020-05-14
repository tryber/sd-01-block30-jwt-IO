const { getData, setData } = require('./utils');
const { v1: uuidv1 } = require('uuid');

const FILE_NAME = 'purchase';
const FILE_PRODUCT = 'products';
const FILE_USER = 'users';

const findOne = (id) => {
  const purchases = await getData(FILE_NAME);
  const purchase = purchases
    .find((purchase) => purchase.id === id);
  if (!purchase) return false;
  return purchase;
}

const isExists = (id, type) => {
  const data = await getData(type);
  return data.some((entidade) => entidade.id === id);
}

const isValidQuantity = (quantity) => {
  const quantityRegex = /[0-9]*/g;
  return quantity.match(quantityRegex)
    && (Number(quantity) > 0)
    && (Number.isInteger(Number(quantity)));
}

const validPurchase = ({ productId, quantity, userID }, update) => {
  if (!productId || !quantity) return false;
  if (!isValidQuantity(quantity)) return false;
  if (!isExists(productId, FILE_PRODUCT)) return false;
  if (update && !userID) return false;
  if (update && !isExists(userID, FILE_USER)) return false;
  return true;
}

const addPurchase = async (obj) => {
  const data = await getData(FILE_NAME);
  const objId = { ...obj, id: uuidv1() };
  const newArray = [...data, objId];
  await setData(FILE_NAME, newArray);
  return objId;
}

const updatePurchase = async (obj, id) => {
  const searchPurchase = await findOne(id);
  if (!searchPurchase) return false;
  const newArray = [...purchases.filter((purchase) => (
    searchPurchase.id !== purchase.id
  )), { ...obj, id: searchPurchase.id }];
  await setData(FILE_NAME, newArray);
  return { ...obj, id: searchPurchase.id };
}

const deletePurchase = async (id) => {
  const searchPurchase = findOne(id);
  if (!searchPurchase) return false;
  const newArray = purchases.filter((purchase) => (
    searchPurchase.id !== purchase.id
  ));
  return setData(FILE_NAME, newArray);
}

const verifyUserPurchase = async (userID, id) => {
  const data = await getData(FILE_NAME);
  return data.find(purchase => purchase.id === id)
    .userID === userID;
}

const getPurchase = async (userID, id) => {
  const data = await getData(FILE_NAME);
  return data.filter(purchase => purchase.userID === userID)
    .find(purchaseUser => purchaseUser.id === id);
}

const getAllPurchase = async (userID) => {
  const data = await getData(FILE_NAME);
  return data.filter(purchase => purchase.userID === userID);
}

const Purchase = {
  validPurchase,
  delete: deletePurchase,
  update: updatePurchase,
  save: addPurchase,
  getAll: getAllPurchase,
  getOne: getPurchase,
  verifyUser: verifyUserPurchase,
};

module.exports = Purchase;
