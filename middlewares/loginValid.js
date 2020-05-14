const fs = require('fs').promises;
const path = require('path');

const { readFileJson } = require('../modifyFile');

async function isLoginTrue(username, password) {
  const userExists = await readFileJson('users');

  return userExists.find(user => user.username === username && user.password === password);
}

async function loginValidMiddleware(req, res, next) {
  const { username, password } = req.body;
  if (!(await isLoginTrue(username, password)))
    return res.status(401).json({ message: 'invalid login / password' });

  next();
}

module.exports = { loginValidMiddleware, isLoginTrue };
