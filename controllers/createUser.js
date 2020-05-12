const express = require('express');

const fs = require('fs').promises;
const path = require('path');

const { userValidMiddleware } = require('../middlewares/userValid');

const router = express.Router();

router.use(userValidMiddleware);

router.post('/', async (req, res) => { 
  const addUser = await fs.readFile(path.resolve(__dirname, '..', 'usersRegistered', 'users.json'), 'utf8');
  const newUsersJson = JSON.parse(addUser)
  const tranformArray = newUsersJson.map((array) => array)
  tranformArray.push(req.body)

  await fs.writeFile(path.resolve(__dirname, '..', 'usersRegistered', 'users.json'),
    JSON.stringify(tranformArray), 'utf8', (err) => {
      if (err) throw err;
      console.log('algo deu errado');
    });

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

module.exports = router;

// const User = require('../models/user');

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
