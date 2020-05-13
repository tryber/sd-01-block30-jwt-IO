const path = require('path');
const fs = require('fs').promises;

const getData = async (name) => {
  console.log(name)
  const content = await fs.readFile(path.resolve(__dirname, '..', `${name}.json`), 'utf8');

  return JSON.parse(content);
};

const setData = async (name, data) => {
  return fs.writeFile(path.resolve(__dirname, '..', `${name}.json`), JSON.stringify(data, null, 2));
}

module.exports = {
  getData,
  setData,
};
