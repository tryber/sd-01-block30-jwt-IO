const fs = require('fs').promises;
const path = require('path');

async function modifyFile(newData, file) {
  await fs.writeFile(path.resolve(__dirname, `${file}.json`),
    JSON.stringify(newData), 'utf8', (err) => {
      if (err) throw err;
      console.log('Ocorreu algum erro!');
    });
}

async function readFileJson(fileName) {
  const fileJson = await fs.readFile(path.resolve(__dirname, `${fileName}.json`), 'utf8');
  return JSON.parse(fileJson);
}

module.exports = { modifyFile, readFileJson };
