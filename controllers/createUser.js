const User = require('../models/user');


module.exports = async (req, res) => {

const {username, password, role } = req.body

const user = new User(username, password, role)

  await user.addNewUser().then((body) => {
    const {password, ...user} = body
    res.status(201).json(user);
  })
  // .catch((err) => {
  //   res.status(400).json({ message: 'Dados inválidos' });
  // });
};
