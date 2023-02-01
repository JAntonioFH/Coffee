const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');


class UsersService{

  async create(data){
    const newUser = {
      id:9,
      ...data
    }
    this.users.push(newUser);
    return newUser
  }
  async find(){
    const rta=await models.User.findAll();
    return rta;
  }
  async findOne(id){
    const user = this.users.find(item => item.id === id);
    if (!user) {
      throw boom.notFound('Producto no encontrado')
    }
    return user;
  }
  async update(id, changes){
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('Producto no encontrado')
    }
      const product = this.users[index]
      this.users[index]={
        ...product,
        ...changes
      };
      return this.users[index];
  }
  async delete(id){
    const index = this.users.findIndex(item => item.id === id);
    if (index===-1) {
      throw boom.notFound('Producto no encontrado')
    }
    this.users.splice(index,1);
    return {id};
  }
}

module.exports = UsersService;
