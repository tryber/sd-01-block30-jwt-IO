const User = require('../models/user');
const {
  users: { validate },
} = require('../validation');

module.exports = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  };

  if (validate(userData)) {
    await User.save(userData);
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  }
  return res.status(422).json({ message: 'Dados inválidos' });
};
