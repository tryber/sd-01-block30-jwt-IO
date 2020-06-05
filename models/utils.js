const path = require('path');
const fs = require('fs').promises;
const { v1: uuidv1 } = require('uuid');

const getData = async (fileName) => {
  const content = await fs.readFile(path.resolve(__dirname, '..', `${fileName}.json`), 'utf8');
  return JSON.parse(content);
};

const setData = async (fileName, data) => (
  fs.writeFile(path.resolve(__dirname, '..', `${fileName}.json`), JSON.stringify(data, null, 2))
);

const addItem = async (obj, fileName, id) => {
  const data = await getData(fileName);
  const objId = id ? { ...obj, id } : { ...obj, id: uuidv1() };
  const newArray = [...data, objId];
  await setData(fileName, newArray);
  return objId;
};

module.exports = {
  getData,
  setData,
  addItem,
};
