const User = require('../../models/user');
const rescue = require('../rescue');
const FILE_NAME = 'users';

const create = async (req, res) => {
  const { username, password, role } = req.body;
  console.log(req.body, 'body')
  if (!username || !password || !role) return res.status(422).json({ message: 'Faltou algum campo' });

  if (!User.isValidDados({ username, password, role })) {
    return res.status(422).json({ message: 'Dados inválidos' });
  }

  const isUnique = await User.isUniqueUser(username);

  if (!isUnique) return res.status(409).json({ message: 'Username já existe' });

  const userData = {
    username,
    password,
    role,
  };

  User.save(userData, FILE_NAME).then(({ password, ...user }) => {
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', data: user });
  })
}

module.exports = rescue(create);
