const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {createProductSchema,updateProductSchema,getProductSchema,updatePartialProductSchema} = require('../schemas/productSchema');


const router = express.Router();
const service = new ProductsService();
//GET
router.get('/', async (req, res, next) => {
  try {
    const productos = await service.find()
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
  });


//POST
  router.post('/',
  validatorHandler(createProductSchema, 'body'),
    async (req, res, next)=>{
      try {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct)
      } catch (error) {
        next(error);
      }
  });

//DELETE
  router.delete('/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const rta = await service.delete(id)
      res.json(rta);
    } catch (error) {
      next(error);
    }
  });
//PUT
router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id,body)
    res.json(product)
  } catch (error) {
    next(error);
  }
});
//PATCH
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updatePartialProductSchema, 'body'),
  async (req, res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id,body)
    res.json(product)
  } catch (error) {
    next(error);
  }
})

//
module.exports = router;
