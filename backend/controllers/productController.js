const Product = require('../models/Product')

const getProducts = async (req, res) => {
  const { gender } = req.query
  try {
    const query = gender ? { gender } : {}
    const products = await Product.find(query)
    return res.status(200).json(products)
  } catch (error) {
    console.log('error fetching products', error)
    return res.status(500).json({ message: 'failed to fetch products'})
  }
}

const getProductById = async (req, res) => {
  try {
    const findProduct = await Product.findById(req.params.id)
    if (!findProduct) {
      return res.status(404).json({ message: "product not found"})
    }
    return res.status(200).json(findProduct)
  } catch (error) {
    console.log('error fetching product by id', error)
    return res.status(400).json({error: "invalid product id"})
  }
}

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    return res.status(201).json(product)
  } catch (error) {
    console.log('error creating product', error)
    return res.status(400).json({ message: 'failed to create product'})
  }
}

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true, runValidators: true}
    )
    if (!updatedProduct) {
      return res.status(404).json({message: 'Product not found'})
    }
    return res.status(200).json(updatedProduct)
  } catch (error) {
    console.log('error updating product', error)
    return res.status(400).json({ message: 'failed to update product' })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deletedProduct) {
      return res.status(404).json({message: 'product not found'})
    }
    return res.status(200).json({ message: 'product deleted successfully'})
  } catch (error) {
    console.log('error deleting a product', error)
    return res.status(500).json({ message: 'failed to delete product'})
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
