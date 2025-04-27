const Product = require('../models//Product')

const getProducts = async (req, res) => {
  const { gender } = req.query
  try {
    const query = gender ? { gender } : {}
    const products = await Product.find(query)
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
}

const getProductById = async (req, res) => {
  try {
    const findProduct = await Product.findById(req.params.id)
    res.json(findProduct)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const createProduct = async (req, res) => {
  try {
    const products = await Product.create(req.body)
    res.status(201).json(products)
  } catch (error) {
    res.status(400).json({ error: error.message})
  }
}

const updateProduct = async (req, res) => {
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
}

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deletedProduct) return res.status(400).json({message: 'product not found'})
    res.json({ message: 'product deleted successfully'})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
