const fs = require('fs').promises;
const path = require('path');

async function loginValidMiddleware(req, res, next) {
  const { username, password } = req.body;
  const usersRegistered = await fs.readFile(path.resolve(__dirname, '..', 'usersRegistered', 'users.json'), 'utf8');

  const userExists = usersRegistered.find(user => user.username === username && user.password === password);
  if (userExists.lenght !== 1) return res.status(401).json({ message: 'invalid login / password' });

  next();
}

module.exports = { loginValidMiddleware };
