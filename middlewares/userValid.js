const fs = require('fs');
const path = require('path');

function usernameValid(username = '') {
  const regex = /^([a-zA-Z0-9 _-]+)$/;
  return username.length >= 6 && regex.test(username);
}

function passwordValid(password = '') {
  return password.length >= 8;
}

function roleValid(role = '') {
  const roleStatus = ['funcionario', 'entregador', 'cliente'];
  return roleStatus.includes(role);
}

function isUserUnique(username) {
  const usersRegistered = fs.readFileSync(path.resolve(__dirname, '..', 'users.json'), 'utf8');
  const userExists = JSON.parse(usersRegistered);

  return userExists.find(user => user.username === username);
}

function userValidMiddleware(req, res, next) {
  const { username, password, role } = req.body
  if (!usernameValid(username) || !passwordValid(password) || !roleValid(role))
    return res.status(400).json({ message: 'Campos inválidos' });

  if (isUserUnique(username))
    return res.status(400).json({ message: 'Nome de usuário não disponível' });

  next();
}

module.exports = { userValidMiddleware };
