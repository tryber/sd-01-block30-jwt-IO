const { getData, setData } = require('./utils');
const { v1: uuidv1 } = require('uuid');

const FILE_NAME = 'purchase';
const FILE_PRODUCT = 'products';
const FILE_USER = 'users';

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

const addPurchase = async (obj, userID) => {
  const data = await getData(FILE_NAME);
  const objId = { ...obj, id: uuidv1(), userID };
  const newArray = [...data, objId];
  return setData(FILE_NAME, newArray)
}

const updatePurchase = async (obj) => {
  const searchPurchase = await findOne(obj);
  if (!searchPurchase) return false;
  const purchases = await getData(FILE_NAME);
  const newArray = [...purchases.filter((purchase) => (
    searchPurchase.id !== purchase.id
  )), { ...obj, id: searchPurchase.id }];
  return setData(FILE_NAME, newArray);
}

const deletePurchase = async (obj) => {
  const searchPurchase = await findOne(obj);
  if (!searchPurchase) return false;
  const purchases = await getData(FILE_NAME);
  const newArray = purchases.filter((purchase) => (
    searchPurchase.id !== purchase.id
  ));
  return setData(FILE_NAME, newArray);
}

const getPurchase = async (userID,id) => {
  const data = await getData(FILE_NAME);
  return data.filter(purchase => purchase.userID === userID)
  .filter(purchaseUser=>purchaseUser.id===id);
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
  getPurchase,
};

module.exports = Purchase;
