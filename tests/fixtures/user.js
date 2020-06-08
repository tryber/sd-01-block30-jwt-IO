const invalidUsernameNotUnique = {
  username: 'repetido',
  password: 'senhasupersecreta',
  role: 'funcionario',
};

const invalidUsername = {
  username: 'errad',
  password: 'senhasupersecreta',
  role: 'funcionario',
};

const invalidUsernameSpecialCharacters = {
  username: 'caractere-especial@',
  password: 'senhasupersecreta',
  role: 'funcionario',
};

const invalidPassword = {
  username: 'guilhermecampos1',
  password: '123',
  role: 'cliente',
};

const invalidRole = {
  username: 'guilhermecampos2',
  password: 'senhasupersecreta',
  role: 'junin',
};

const validUser = {
  username: 'guilhermecampos3',
  password: 'senhasupersecreta',
  role: 'entregador',
};

module.exports = {
  invalidUsernameNotUnique,
  invalidUsername,
  invalidUsernameSpecialCharacters,
  invalidPassword,
  invalidRole,
  validUser,
};
