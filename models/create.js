const { v4: uuidv4 } = require('uuid');
const { getFile, findByParam } = require('../service/files');
const fs = require('fs').promises;
const path = require('path');


const User = {
  save: async (userData) => {
    const users = await getFile('users.json');
    const newUse = { ...userData, id: uuidv4() };
    users.push(newUse);

    fs.writeFile(
      path.resolve(__dirname, '..', 'users.json'),
      JSON.stringify(users),
      (err) => {
        if (err) throw err;
      },
    );
  },

  findLogin: async (log) => {
    const users = await getFile('users.json');

    return users.find(
      user => user.username === log.username && user.password === log.password,
    );
  },

  findUser: username => findByParam('users.json', username, 'username'),
};

module.exports = User;
