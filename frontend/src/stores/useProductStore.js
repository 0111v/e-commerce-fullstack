import { create } from 'zustand'
import axios from 'axios'

export const useProductStore = create((set) => ({
  products: [],

  getAllProducts: async () => {
    try {
      const res = await axios.get('/products')
      set({ products: res.data})
    } catch (error) {
      console.log(error)
    }
  },

  getProductById: async (id) => {
    try {
      const res = await axios.get(`/products/${id}`)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },

  getProductsByQuery: async (query) => {
    try {
      const res = await axios.get(`/products?${query}`)
      set({ products: res.data})
    } catch (error) {
      console.log(error)
    }
  },

  createProduct: async (newProduct) => {
    try {
      const res = await axios.post('/products', newProduct)
    } catch (error) {
      console.log(error)
    }
  },

  updateProduct: async (id, editedProduct) => {
    try {
      const res = await axios.put(`/products/${id}`, editedProduct)
    } catch (error) {
      console.log(error)
    }
  },

  deleteProduct: async (id) => {
    try {
    const res = await axios.delete(`/products/${id}`)
    } catch (error) {
      console.log(error)
    }
  }
}))