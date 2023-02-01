const boom = require('@hapi/boom');
const pool = require('../libs/postgres');
const sequelize = require('../libs/sequelize')

class ProductsService{
  constructor(){
    this.pool=pool
    this.pool.on('error',(err)=> console.error(err));
  }
  async create(data){
    const newProduct = {
      id:9,
      ...data
    }
    this.products.push(newProduct);
    return newProduct
  }
  async find(){
    const query = 'SELECT * FROM task'
    const [data] = await sequelize.query(query);
    return data;
  }
  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Producto no encontrado')
    }
    return product;
  }
  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('Producto no encontrado')
    }
      const product = this.products[index]
      this.products[index]={
        ...product,
        ...changes
      };
      return this.products[index];
  }
  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if (index===-1) {
      throw boom.notFound('Producto no encontrado')
    }
    this.products.splice(index,1);
    return {id};
  }
}


module.exports = ProductsService;
