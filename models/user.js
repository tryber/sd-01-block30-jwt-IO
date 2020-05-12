const fs = require('fs').promises;
const path = require('path');

const getFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '..', 'users.json'));
  return JSON.parse(content.toString('utf-8'));
};

const User = {
  save: async userData => {
    const users = await getFile();
    users.push(userData);

    fs.writeFile(
      path.resolve(__dirname, '..', 'users.json'),
      JSON.stringify(users),
      err => {
        if (err) throw err;
      }
    );
  },
};

module.exports = User;
