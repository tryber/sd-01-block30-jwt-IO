const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { getFile } = require('../service.js');

const User = {
  save: async (userData) => {
    const users = await getFile('users.json');
    userData.id = uuidv4();
    users.push(userData);

    fs.writeFile(
      path.resolve(__dirname, '..', 'users.json'),
      JSON.stringify(users),
      (err) => {
        if (err) throw err;
      }
    );
  },
  loginFind: async (log) => {
    const users = await getFile('users.json');
    return users.find(
      user => user.username === log.username && user.password === log.password
    );
  },
  findByUser: async (username) => {
    const users = await getFile('users.json');
    return users.find(user => user.username === username);
  },
};

module.exports = User;
