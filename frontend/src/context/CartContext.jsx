import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? 
      JSON.parse(storedCart) :
      []
  })
  const [search, setSearch] = useState('')
  

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === product._id)
      if (existingItem) {
        return prev.map((item) => item._id === product._id ? 
          {...item, quantity: item.quantity + 1} :
          item)
      } else return [...prev, {...product, quantity: 1}]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => {
      return prev.filter((item) => item._id !== id)
    })
  }

  const increaseQty = (id) => {
    setCart((prev) => {
      return prev.map((item) => item._id === id ? 
      {...item, quantity: item.quantity + 1} :
      item)
    })
  }

  const decreaseQty = (id) => {
    setCart((prev) => {
      return prev.map((item) => item._id === id && item.quantity > 1 ?
      {...item, quantity: item.quantity - 1} :
      item)
    })
  }

  return (
  <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, increaseQty, decreaseQty, search, setSearch}}>
    {children}
  </CartContext.Provider>)
}

export const useCart = () => useContext(CartContext)