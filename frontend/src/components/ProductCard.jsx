import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const {addToCart} = useCart()
  

  return (
    <div className='bg-white shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300'>
      <Link to={`/product/${product._id}`} className='flex justify-center items-center'>
        <img src={product.image} alt={product.title} className='h-100 w-full object-cover'/>
      </Link>
      <div className='px-4 py-2 flex flex-col flex-grow'>
        <h2 className='text-xl font-medium text-gray-800 mb-1 line-clamp-2'>{product.title}</h2>
        <p className="text-lg font-semibold text-green-600 mb-2">${(product.price).toFixed(2)}</p>
        <button 
          className='mt-auto bg-black text-white text-md font-semibold py-2 px-4 rounded hover:bg-gray-800 transition-colors cursor-pointer' 
          onClick={() => addToCart(product)}>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}

export default ProductCard