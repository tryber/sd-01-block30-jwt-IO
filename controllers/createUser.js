const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const { userValidMiddleware } = require('../middlewares/userValid');
const { modifyFile } = require('../modifyFile');

const router = express.Router();

router.use(userValidMiddleware);

router.post('/', async (req, res) => {
  const addUser = await fs.readFile(path.resolve(__dirname, '..', 'users.json'), 'utf8');
  const newUsersJson = JSON.parse(addUser);

  const user = { ...req.body, id: uuidv4() };
  newUsersJson.push(user);

  await modifyFile(newUsersJson, 'users');

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

module.exports = router;
