const { fileModifier } = require('../api/utils')

const User = {
  save: (userData) => {
    // Mude a criação de usuário aqui
    return Promise.resolve(userData); 
  }
};

class People {
  constructor (name, age) {
    this.id = null;
    this.name = name;
    this.age = age;
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
      this.name = name;
    this.age = age;
    } else {
      this.id = allUsers[allUsers.length - 1].id + 1
    allUsers.push(this);
    }

    await fileModifier('write', allUsers)
    return allUsers
  }

}

module.exports = User;
