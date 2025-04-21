const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const verifyToken = require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const products = await Product.create(req.body)
    res.status(201).json(products)
  } catch (error) {
    res.status(400).json({ error: error.message})
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true, runValidators: true}
    )
    if (!updatedProduct) return res.status(404).json({message: 'Product not found'})
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deletedProduct) return res.status(400).json({message: 'product not found'})
    res.json({ message: 'product deleted successfully'})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

  

module.exports = router