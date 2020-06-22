const fs = require('fs');

const path = require('path');

function userNameValidation(username = '') {
  const regex = /[a-zA-Z0-9]+/;
  return username.match(regex) && username.length >= 6;
}

function passwordValidation(password = '') {
  return password.length >= 8;
}

function roleValidation(role = '') {
  const roleOptions = ['funcionario', 'entregador', 'cliente'];
  return roleOptions.includes(role);
}

function userUniqueValidation(username) {
  const content = fs.readFileSync(path.resolve(__dirname, '..', 'users.json'), 'utf-8');
  const uniqueUser = JSON.parse(content);

  return uniqueUser.find(user => user.username === username);
}

function validCreateUserMiddleware(req, res, next) {
  const { username, password, role } = req.body;
  if (!userNameValidation(username) || !passwordValidation(password) || !roleValidation(role))
    return res.status(400).json({ message: 'Invalid fields' });

  if (userUniqueValidation(username))
    return res.status(400).json({ message: 'User must be unique' });

  next();
}

module.exports = { validCreateUserMiddleware, userUniqueValidation };
