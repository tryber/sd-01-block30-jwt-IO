const express = require('express');
const rescue = require('../rescue');
const { userValid, userUnique } = require('../models/login');
const generateJWT = require('../service/generateJWT');

const router = express.Router();


const login = (req, res) => {
  const { password, username } = req.body;
  if (!username || !password) return res.status(422).json({ message: 'Campos vazios' });
  const user = userValid(username, password);

  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
  const { username: users, role, id } = userUnique(username, password);
  const token = generateJWT(users, role, id);

  res.status(200).json({ token });
};

router.post('/', rescue(login));

module.exports = router;
