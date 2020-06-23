const verifyUser = (values) => {
  const { username, password, role } = values;
  const regex = /^([a-zA-Z0-9]{6,})$/;
  const verifyusername = regex.test(username);
  const verifyRole = ['funcionario', 'entregador', 'cliente'].some(
    element => element === role,
  );
  const verifyPassword = password.length >= 8;
  return verifyusername && verifyRole && verifyPassword;
};

const verifyProducts = (values) => {
  const { name, price } = values;
  const namePresents = name.length >= 5;
  const pricePresent = typeof price === 'number' && price > 0;
  return namePresents && pricePresent;
};

module.exports = { verifyUser, verifyProducts };
