'use strict';

const express = require('express');
const morgan = require('morgan');
const { getAllItems, getSingleItem, updateItem} = require("./itemsHandlers")
const { getCompanies, getCompany, updateCompany} = require("./companyHandlers")
const { getOrders, getOrder, updateOrder, createOrder, deleteOrder, emptyCart} = require("./orderHandlers")

const PORT = 8000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  .get('/products', getAllItems)
  .get('/product/:productId', getSingleItem)
  .patch('/product/:productId', updateItem)
  
  .get('/companies', getCompanies)
  .get('/company/:companyId', getCompany)
  .patch('/company/:companyId', updateCompany)


  .get('/orders', getOrders)
  .post('/order', createOrder)
  .patch('/order/:productId', updateOrder)
  .delete('/order', deleteOrder)

  .delete('/cart', emptyCart)
  // .get('/purchases/:userId', getPurchaseOrder)
  

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
