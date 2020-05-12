function usernameValid(username = '') {
  const regex = /^([a-zA-Z0-9 _-]+)$/;
  return username.length >= 6 && regex.test(username);
}

function passwordValid(password = '') {
  return password.length >= 8;
}

function roleValid(role = '') {
  const roleStatus = ['funcionario', 'entregador', 'cliente'];
  return roleStatus.includes(role);
}

function userValidMiddleware(req, res, next) {
  const { username, password, role } = req.body
  if (!usernameValid(username) || !passwordValid(password) || !roleValid(role))
    return res.status(400).json({ message: 'Campos inválidos' });

  next();
}

module.exports = { userValidMiddleware };
