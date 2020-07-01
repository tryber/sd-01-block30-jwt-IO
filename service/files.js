const fs = require('fs').promises;
const path = require('path');

const getFile = async (fileName) => {
  const data = await fs.readFile(path.resolve(__dirname, '..', `${fileName}`), 'utf-8');
  return JSON.parse(data);
};

const writeFile = async (content, file) =>
  fs.writeFile(
    path.resolve(__dirname, '..', file),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    },
  );

async function findByParam(file, param, pos) {
  const data = await getFile(file);
  return data.find(each => each[pos] === param);
}

const dataExists = async (file, param, pos) => {
  const data = await getFile(file);
  const exists = data.some(each => each[pos] === param);
  return exists;
};

module.exports = { getFile, writeFile, findByParam, dataExists };
