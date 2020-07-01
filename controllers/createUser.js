const express = require('express');
const rescue = require('../rescue');
const User = require('../models/create');

const { userValid } = require('../middlewares/validateUsers');

const router = express.Router();

const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  const userData = {
    username,
    password,
    role,
  };

  if (!username || !password || !role)
    return res.status(400).json({ message: 'Campos vazios!' });

  if (!(await !User.userValid))
    return res.status(422).json({ message: 'Dados inválidos!' });
  User.save(userData)
    .then(() => res.status(201).json({ message: 'Usuário cadastrado com sucesso' }));
};

router.post('/', rescue(createUser));

module.exports = router;
