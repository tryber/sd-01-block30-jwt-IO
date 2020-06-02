const verifyUser = values => {
  const { username, password, role } = values;
  const regex = /^([a-zA-Z0-9]{6,})$/;
  const verifyusername = regex.test(username);
  const verifyRole = ['funcionario', 'entregador', 'cliente'].some(
    element => element === role,
  );
  const verifyPassword = password.length >= 8;
  return verifyusername && verifyRole && verifyPassword;
};

module.exports = verifyUser;
