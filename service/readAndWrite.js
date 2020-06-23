const path = require('path');

const fs = require('fs').promises;

const readAndWrite = async (fileModifierType, file, newContent) => {
  const filePath = path.resolve(__dirname, '..', file);

  const readFile = () =>
    fs.readFile(filePath).then(fileContent => JSON.parse(fileContent));

  const writeFile = conteiner =>
    fs.writeFile(filePath, JSON.stringify(conteiner, null, 2));

  const choices = {
    read: readFile,
    write: writeFile,
    default: 'Tipo de modificador errado',
  };

  return choices[fileModifierType](newContent) || choices.default;
};

module.exports = readAndWrite;
