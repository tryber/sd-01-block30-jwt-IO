const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { userValidMiddleware } = require('../middlewares/userValid');
const { modifyFile, readFileJson } = require('../modifyFile');

const router = express.Router();

router.use(userValidMiddleware);

router.post('/', async (req, res) => {
  const newUsersJson = await readFileJson('users');
  const user = { id: uuidv4(), ...req.body };
  newUsersJson.push(user);

  await modifyFile(newUsersJson, 'users');

  res.status(201).json({ message: 'User successfully registered!' });
});

module.exports = router;
