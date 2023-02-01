const express = require('express');
const UsersService = require('../services/usersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {createUserSchema,updatePartialUserSchema,getUserSchema,updateUserSchema} = require('../schemas/usersSchema');


const router = express.Router();
const service = new UsersService();
//GET
router.get('/',async(req,res,next)=>{
  try{
    const users=await service.find();
    res.json(users);
  }catch(error){
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
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
  validatorHandler(createUserSchema, 'body'),
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
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
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
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updatePartialUserSchema, 'body'),
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


