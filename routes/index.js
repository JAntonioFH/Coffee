const express = require('express')
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
// const categoriesRouter = require('./categoriesRouter');



function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router);
  router.use('/productos',productsRouter);
  router.use('/users',usersRouter)
  // router.use('/categories',categoriesRouter)
}

module.exports = routerApi;
