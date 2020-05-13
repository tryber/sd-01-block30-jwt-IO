const User = require('../models/user');
const { isUniqueUser } = require('./validation/validData');

module.exports = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(422).json({ message: 'Faltou algum campo' });

  if (!User.isValidDados({ username, password, role })) {
    return res.status(422).json({ message: 'Dados inválidos' });
  }

  const isUnique = await isUniqueUser(username);

  if (!isUnique) return res.status(409).json({ message: 'Username já existe' });

  const userData = {
    username,
    password,
    role,
  };

  User.save(userData).then(() => {
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  }).catch((err) => {
    console.error(err);
    res.status(400).json({ message: 'Dados inválidos' });
  });
};
