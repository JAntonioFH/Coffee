const faker = require('faker');
const boom = require('@hapi/boom')

class CategoriesService{
  //Create
  async create(data){
    const newCategory = {
      id:faker.datatype.uuid(),
      ...data
    }
    this.products.push(newCategory);
    return newCategory
  }
  //Find
  async find(){
    return this.categories;
  }
  //FindOne
  async findOne(id){
    const category = this.categories.find(item => item.id === id);
    if (!category) {
      throw boom.notFound('Producto no encontrado')
    }
    return category;
  }
  //Update
  async update(id, changes){
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('Producto no encontrado')
    }
      const category = this.categories[index]
      this.products[index]={
        ...category,
        ...changes
      };
      return this.categories[index];
  }
  //Delete
  async delete(id){
    const index = this.categories.findIndex(item => item.id === id);
    if (index===-1) {
      throw boom.notFound('Producto no encontrado')
    }
    this.categories.splice(index,1);
    return {id};
  }
}

module.exports = CategoriesService;
