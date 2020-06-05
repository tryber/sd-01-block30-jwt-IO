const readAndWrite = require('../service/readAndWrite');
const {verifyUser} = require('../service/checkers');
const { v4: uuidv4 } = require('uuid');

class User {
  constructor(username, password, role) {
    this.id = null;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  async getById(id) {
    const allUsers = await readAndWrite('read', 'users.json');
    const oneUser = allUsers.find(person => person.id === id);
    return oneUser;
  }

  async addNewUser() {
    const allUsers = await readAndWrite('read', 'users.json');
    const verifyUsername = allUsers.some(
      select => select.username === this.username,
    );
    if (!verifyUser(this) || verifyUsername)
      throw new Error('Something broke! 😱');
    this.id = uuidv4();
    allUsers.push(this);
    await readAndWrite('write', 'users.json', allUsers);
    return this;
  }

  async delete(id) {
    const allUsers = await readAndWrite('read', 'users.json');

    const newAllUsers = allUsers.filter(person => person.id !== parseInt(id));

    await readAndWrite('write', 'users.json', newAllUsers);

    return newAllUsers;
  }

  async addOrUpdateUsers(id) {
    const allUsers = await readAndWrite('read', 'users.json');

    const oneUser = allUsers.find(person => person.id === parseInt(id));

    if (oneUser) {
      this.username = username;
      this.password = password;
      this.role = role;
    } else {
      this.id = uuidv4();
      allUsers.push(this);
    }

    await readAndWrite('write', 'users.json', allUsers);
    return allUsers;
  }
}

module.exports = User;
