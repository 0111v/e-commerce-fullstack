const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', verifyToken, createProduct)
router.put('/:id', verifyToken, updateProduct)
router.delete('/:id', verifyToken, deleteProduct)


module.exports = router