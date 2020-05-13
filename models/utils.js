const path = require('path');
const fs = require('fs').promises;

const getData = async (name) => {
  const content = await fs.readFile(path.resolve(__dirname, '..', `${name}.json`));
  return JSON.parse(content.toString('utf-8'));
};

const setData = async (name, data) => {
  return fs.writeFile(path.resolve(__dirname, '..', `${name}.json`), JSON.stringify(data));
}

module.exports = {
  getData,
  setData,
};
