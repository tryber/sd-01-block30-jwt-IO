const User = require('../../models/user');

module.exports = async (req, res) => {
  const { username, password, role } = req.body;
  const userData = {
    username,
    password,
    role,
  };

  if (!username || !password || !role)
    return res.status(400).json({ message: 'Campos vazios!' });

  if (!(await User.validate(username, password, role)))
    return res.status(422).json({ message: 'Dados inválidos!' });

  User.save(userData).then(() => res.status(201).json({ message: 'Usuário cadastrado com sucesso' }));
};
