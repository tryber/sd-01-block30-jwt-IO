const fs = require('fs').promises;
const path = require('path');
const { v1: uuidv1 } = require('uuid');

async function getData(fileName) {
  const data = await fs.readFile(path.resolve(__dirname, '..', `${fileName}.json`), 'utf-8');
  return JSON.parse(data);
}

function setData(fileName, data) {
  return fs.writeFile(path.resolve(__dirname, '..', `${fileName}.json`), JSON.stringify(data, null, 2));
}

async function addItem(fileName, data) {
  let fileData = await getData(fileName);
  fileData = [...fileData, data];
  setData(fileName, fileData);
}

async function addItemWithId(fileName, data) {
  let fileData = await getData(fileName);
  const item = { id: uuidv1(), ...data };
  fileData = [...fileData, item];
  await setData(fileName, fileData);
  return item;
}

module.exports = { getData, addItem, addItemWithId };
