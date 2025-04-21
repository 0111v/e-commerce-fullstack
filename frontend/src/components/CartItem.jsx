import React from 'react'
import { useCart } from '../context/CartContext'

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQty, decreaseQty } = useCart()

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white shadow rounded-lg p-4 border">
      <img
        src={item.image}
        alt={item.title}
        className="w-60 h-60 object-contain"
      />

      <div className="flex-1 mt-auto">
        <h2 className="font-semibold text-lg mb-auto">{item.title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          Preço unitário: R$ {item.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600 mb-3">
          Quantidade: {item.quantity}
        </p>

        <div className="flex gap-2 items-center flex-wrap">
          <button
            onClick={() => decreaseQty(item._id)}
            disabled={item.quantity === 1}
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
          >
            -
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            onClick={() => increaseQty(item._id)}
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer"
          >
            +
          </button>

          <button
            onClick={() => removeFromCart(item._id)}
            className="ml-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
