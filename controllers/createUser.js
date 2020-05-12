const User = require('../models/user');

module.exports = (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  };

  User.save(userData).then((user) => {
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  }).catch((err) => {
    res.status(400).json({ message: 'Dados inválidos' });
  });
};
