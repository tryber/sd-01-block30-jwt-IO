const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { userValidMiddleware } = require('../middlewares/userValid');
const { modifyFile, readFileJson } = require('../modifyFile');

const router = express.Router();

router.use(userValidMiddleware);

router.post('/', async (req, res) => {
  const newUsersJson = await readFileJson('users');
  const user = { ...req.body, id: uuidv4() };
  newUsersJson.push(user);

  await modifyFile(newUsersJson, 'users');

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

module.exports = router;
