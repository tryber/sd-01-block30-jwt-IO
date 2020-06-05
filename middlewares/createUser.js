function userNameValidation (username = '') {
  const regex = /[a-zA-Z0-9]+/;
  return username.match(regex) && username.length >= 6;
};

function passwordValidation(password = '') {
  return password.length >= 8;
}

function roleValidation(role = '') {
  const roleOptions = ['funcionario', 'entregador', 'cliente'];
  return roleOptions.includes(role);
}

function validCreateUserMiddleware(req, res, next) {
  const { username, password, role } = req.body;
  if (!userNameValidation(username) || !passwordValidation(password) || !roleValidation(role)) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
}

module.exports = { validCreateUserMiddleware };
