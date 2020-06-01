const { fileModifier } = require('../api/utils')

// const User = {
//   save: (userData) => {
//     // Mude a criação de usuário aqui
//     return Promise.resolve(userData); 
//   }
// };

class User {
  constructor (username, password, role) {
    this.id = null
    this.username = username;
    this.password = password;
    this.role = role;
  }

  async getAll () {
    const allUsers = await fileModifier('read')
    return allUsers
  }

  async getById (id) {
    const allUsers = await fileModifier('read')
    const oneUser = allUsers.find((person)=>person.id === parseInt(id))
    return oneUser
  }

  async addNewUser () {
    const allUsers = await fileModifier('read')

    this.id = allUsers[allUsers.length - 1].id + 1
    allUsers.push(this);
    await fileModifier('write', allUsers)
    return this
  }

  async delete (id) {
    const allUsers = await fileModifier('read')

    const newAllUsers = allUsers.filter(
      (person) => person.id !== parseInt(id)
    )

    await fileModifier('write', newAllUsers)

    return newAllUsers

  }

  async addOrUpdateUsers (id) {
    const allUsers = await fileModifier('read')

    const oneUser = allUsers.find((person)=>person.id === parseInt(id))

    if (oneUser) {
      this.username = username;
      this.password = password;
      this.role = role;
    } else {
      this.id = allUsers[allUsers.length - 1].id + 1
    allUsers.push(this);
    }

    await fileModifier('write', allUsers)
    return allUsers
  }

}

module.exports = User;
