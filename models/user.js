const readAndWrite = require('../validations/readAndWrite')
const verifyUser = require('../validations/verifyUser')
const { v4: uuidv4 } = require('uuid');

class User {
  constructor (username, password, role) {
    this.id = null
    this.username = username;
    this.password = password;
    this.role = role;
  }

  async getAll () {
    const allUsers = await readAndWrite('read', file)
    return allUsers
  }

  async getById (id) {
    const allUsers = await readAndWrite('read', file)
    const oneUser = allUsers.find((person)=>person.id === parseInt(id))
    return oneUser
  }

  async addNewUser () {
    const allUsers = await readAndWrite('read', 'users.json')
    const verifyUsername = allUsers.some(select => select.username === this.username)
    if (!verifyUser(this) || verifyUsername) throw new Error('Something broke! 😱')
    this.id = uuidv4()
    allUsers.push(this);
    await readAndWrite('write', 'users.json', allUsers)
    return this
  }

  async delete (id) {
    const allUsers = await readAndWrite('read', file)

    const newAllUsers = allUsers.filter(
      (person) => person.id !== parseInt(id)
    )

    await readAndWrite('write', file, newAllUsers)

    return newAllUsers

  }

  async addOrUpdateUsers (id, file) {
    const allUsers = await readAndWrite('read', file)

    const oneUser = allUsers.find((person)=>person.id === parseInt(id))

    if (oneUser) {
      this.username = username;
      this.password = password;
      this.role = role;
    } else {
      this.id = uuidv4()
    allUsers.push(this);
    }

    await readAndWrite('write',file, allUsers)
    return allUsers
  }
}

module.exports = User;
