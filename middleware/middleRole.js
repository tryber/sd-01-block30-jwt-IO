const EMPLOYEE = 'funcionario';

const valid = async (req, res, next) => {
  const { role } = req.user;
  if (role !== EMPLOYEE) return res.status(401).json({ message: 'Não autorizado' });
  next();
};

module.exports = {
  valid,
};
