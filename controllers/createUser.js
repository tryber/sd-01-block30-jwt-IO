const express = require('express');

const { v4: uuid4 } = require('uuid');

const { readFileJson, writeFileJson } = require('../fs-functions');

const router = express.Router();

const { validCreateUserMiddleware } = require('../middlewares/createUser');

router.post('/', validCreateUserMiddleware, async (req, res) => {
  const newUsersJson = await readFileJson('users');
  const user = { id: uuid4(), ...req.body };
  newUsersJson.push(user);

  await writeFileJson(newUsersJson, 'users');

  res.status(201).json({ message: 'User successfully registered' });
});

module.exports = router;
