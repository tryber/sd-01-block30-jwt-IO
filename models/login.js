const readAndWrite = require('../service/readAndWrite');

class Login {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async findOne(users) {
    const listUser = await readAndWrite('read', 'users.json');
    if (listUser.length <= 0) throw new Error('User not create');
    return listUser.find(user => user.username === users);
  }
}

module.exports = Login;
