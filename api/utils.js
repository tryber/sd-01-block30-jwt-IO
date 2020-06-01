const path = require('path');

const fs = require('fs').promises;

const fileModifier = async (fileModifierType, newContent) => {
  const filePath = path.resolve(__dirname, '..', 'currencies.json');

  const readFile = () =>
    fs.readFile(filePath).then(fileContent => JSON.parse(fileContent));

  const writeFile = conteiner =>
    fs.writeFile(filePath, JSON.stringify(conteiner));

  const choices = {
    read: readFile,
    write: writeFile,
    default: 'Tipo de modificador errado',
  };

  return choices[fileModifierType](newContent) || choices.default;
};

module.exports = {fileModifier}