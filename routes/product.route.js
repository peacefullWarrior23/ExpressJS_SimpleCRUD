const express = require('express')
const Product = require('../models/product.model.js')
const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require('../controller/product.controller.js')
const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/',addProduct)

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;