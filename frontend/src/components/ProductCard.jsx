import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const {addToCart} = useCart()
  

  return (
    <div className='bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300'>
      <Link to={`/product/${product._id}`} className='flex justify-center items-center p-4'>
        <img src={product.image} alt={product.title} className='h-80 object-contain'/>
      </Link>
      <div className='px-4 py-2 flex flex-col flex-grow'>
        <h2 className='text-sm font-medium text-gray-800 mb-1 line-clamp-2'>{product.title}</h2>
        <p className="text-lg font-semibold text-green-600 mb-2">${(product.price).toFixed(2)}</p>
        <button 
          className='mt-auto bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors cursor-pointer' 
          onClick={() => addToCart(product)}>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}

export default ProductCard