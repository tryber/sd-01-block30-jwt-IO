const express = require('express');
// const User = require('../models/user');

const { userValidMiddleware } = require('../middlewares/userValid');

const router = express.Router();

router.use(userValidMiddleware);

// module.exports = (req, res) => {
//   const userData = {
//     username: req.body.username,
//     password: req.body.password
//   };

//   User.save(userData).then((user) => {
//     res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
//   }).catch((err) => {
//     res.status(400).json({ message: 'Dados inválidos' });
//   });
// };

router.post('/', (req, res) => {

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

module.exports = router;
