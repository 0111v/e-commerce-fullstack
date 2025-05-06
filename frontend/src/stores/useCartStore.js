import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(persist(
  (set) => ({
    cart: [],

    addToCart: (product) => {
      set((state) => {
        const existingItem = state.cart.find((item) => item._id === product._id)

        if (existingItem) {
          return {
            cart: state.cart.map((item) => 
              item._id === product._id ?
              { ...item, quantity: item.quantity + 1} :
              item
            )
          }
        } else return {
          cart: [...state.cart, { ...product, quantity: 1}]
        }
      })
    },

    removeFromCart: (id) => {
      set((state) => ({
        cart: state.cart.filter((item) => item._id !== id)
      }))
    },

    increaseQty: (id) => {
      set((state) => ({
        cart: state.cart.map((item) => item._id === id ? 
          { ...item, quantity: item.quantity + 1} : 
          item
        )
      }))
    },

    decreaseQty: (id) => {
      set((state) => ({
        cart: state.cart.map((item) => item._id === id && item.quantity > 1 ? 
          { ...item, quantity: item.quantity - 1} :
          item
        )
      }))
    },

    clearCart: () => {
      set({ cart: [] })
    }
  }), {
    name: 'cart-storage'
  }
))