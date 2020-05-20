const fs = require('fs').promises;
const path = require('path');

const getFile = async file => {
  const content = await fs.readFile(path.resolve(__dirname, '.', file));
  return JSON.parse(content.toString('utf-8'));
};

module.exports = { getFile };
