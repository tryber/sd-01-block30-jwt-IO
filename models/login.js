const fs = require('fs');
const path = require('path');

const userUnique = (username, password) => {
  const usersRegister = fs.readFileSync(path.resolve(__dirname, '..', 'users.json'), 'utf8');
  const userExists = JSON.parse(usersRegister);
  return userExists.find(user => user.username === username && user.password === password);
}

const userValid = (username, password) => {
  if (!userUnique(username, password))
    return { message: 'Username not available!' };
    return true;
}

module.exports = { userValid, userUnique };