const express = require('express')
const router = express.Router()
const { verifyToken, adminRoute} = require('../middleware/auth')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', verifyToken, adminRoute, createProduct)
router.put('/:id', verifyToken, adminRoute, updateProduct)
router.delete('/:id', verifyToken, adminRoute, deleteProduct)


module.exports = router