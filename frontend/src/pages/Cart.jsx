import React, { useEffect } from 'react'
// import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import { useUserStore } from '../stores/useUserStore'

const Cart = () => {
  const { token, isLoggedIn } = useUserStore()
  const {cart} = useCartStore()
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const navigate = useNavigate()

  console.log(isLoggedIn, token)



  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/checkout' } })
    } else {
      navigate('/checkout')
    }
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-bold mb-4'>Seu carrinho:</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Nenhum item no carrinho ainda.</p>
      ) : ( <>
        <div className="space-y-4">
          {cart.map((item) => <CartItem key={item._id} item={item} />)}
        </div>
        <div className="mt-8 border-t pt-4 flex flex-col items-end">
          <h2 className="text-xl font-semibold mb-2">Total R$ {total.toFixed(2)}</h2>
            <button 
              onClick={handleCheckout}
              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer'>
              Finalizar a compra
            </button>
        </div>
        </>
      )}
    </div>
  )
}

export default Cart