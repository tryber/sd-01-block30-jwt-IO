const fs = require('fs');
const path = require('path');

function isLoginTrue(username, password) {
  const usersRegistered = fs.readFileSync(path.resolve(__dirname, '..', 'data', 'users.json'), 'utf8');
  const userExists = JSON.parse(usersRegistered);

  return userExists.find(user => user.username === username && user.password === password);
}

function loginValidMiddleware(req, res, next) {
  const { username, password } = req.body;
  if (!isLoginTrue(username, password))
    return res.status(401).json({ message: 'invalid login / password' });

  next();
}

module.exports = { loginValidMiddleware, isLoginTrue };
