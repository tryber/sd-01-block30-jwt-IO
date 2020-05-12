const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const getFile = async () => {
  const content = await fs.readFile(
    path.resolve(__dirname, '..', 'users.json')
  );
  return JSON.parse(content.toString('utf-8'));
};

const User = {
  save: async userData => {
    const users = await getFile();
    userData.id = uuidv4();
    users.push(userData);

    fs.writeFile(
      path.resolve(__dirname, '..', 'users.json'),
      JSON.stringify(users),
      err => {
        if (err) throw err;
      }
    );
  },
  findOne: async log => {
    const users = await getFile();
    return users.find(
      user => user.username === log.username && user.password === log.password
    );
  },
};

module.exports = User;
