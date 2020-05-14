const fs = require('fs').promises;
const path = require('path');

async function modifyFile(newData, file) {
  await fs.writeFile(path.resolve(__dirname, `${file}.json`),
    JSON.stringify(newData), 'utf8', (err) => {
      if (err) throw err;
      console.log('Ocorreu algum erro!');
    });
}

module.exports = { modifyFile };
