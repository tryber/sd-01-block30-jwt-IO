
const valid = async (req, res, next) => {
  console.log(req.body);
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(422).json({ message: 'Faltou algum campo' });
  next();
};

module.exports = {
  valid,
};
