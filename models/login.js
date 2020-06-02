const readAndWrite = require('../validations/readAndWrite');

class Login {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async findOne(id) {
      const listUser = await readAndWrite('read', 'users.json');
      if (id) {
        return listUser.find(person => person.id === parseInt(id));  
      }
    if (listUser.length <= 0) throw new Error('User not create');
    return listUsers.find(user => (user.username = this.username));
  }
}

module.exports = Login;
