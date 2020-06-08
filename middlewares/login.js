const { readFileJson } = require('../fs-functions');

async function verifyUserExists(username, password) {
  const userExists = await readFileJson('users');

  return userExists.find(user => user.username === username && user.password === password);
}

async function validLoginMiddleware(req, res, next) {
  const { username, password } = req.body;
  if (!(await verifyUserExists(username, password)))
    return res.status(400).json({ message: 'User not registered' });

  next();
}

module.exports = { validLoginMiddleware, verifyUserExists };
