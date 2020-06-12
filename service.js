const fs = require('fs').promises;
const path = require('path');

const getFile = async (file) => {
  const content = await fs.readFile(path.resolve(__dirname, '.', file));
  return JSON.parse(content.toString('utf-8'));
};

const writing = async (content, file) =>
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

module.exports = { getFile, writing, findByParam, dataExists };
