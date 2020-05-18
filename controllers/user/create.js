const User = require('../../models/user');
const rescue = require('../rescue');
const FILE_NAME = 'users';

const create = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) return res.status(422).json({ message: 'Faltou algum campo' });

  const isUnique = await User.isUniqueUser(username);

  if (!isUnique) return res.status(409).json({ message: 'Username já existe' });

  const userData = {
    username,
    password,
    role,
  };

  const user = await User.save(userData, FILE_NAME);
  const usu = Object.entries(user)
    .reduce((acc, data) => {
      if (data[0] === 'password') return acc;
      return { ...acc, [data[0]]: data[1] };
    }, {});
  console.log(usu);
  return res.status(201).json({ message: 'Usuário cadastrado com sucesso', data: usu });
};

module.exports = rescue(create);
