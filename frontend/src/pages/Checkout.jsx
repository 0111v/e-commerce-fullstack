import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { cart, setCart } = useCart()
  const navigate = useNavigate()

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handlePlaceOrder = () => {
    alert("Pedido realizado com sucesso! 🎉\n\nEste é um projeto fictício para fins de estudo e nenhum pedido real foi feito.")
    setCart([]) 
    navigate('/') 
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Resumo do Pedido</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Seu carrinho está vazio. <Link className="text-blue-600 hover:underline" to="/">Voltar para a loja</Link></p>
        
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cart.map(item => (
              <li className="bg-white p-4 rounded-lg shadow flex justify-between items-center" key={item.id}>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.quantity}x</p>
                </div>
                <span className="font-medium">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="text-right mb-4">
            <p className="text-xl font-semibold">Total: R$ {total.toFixed(2)}</p>
          </div>

          <div className="text-center">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
            >
              Finalizar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Checkout
