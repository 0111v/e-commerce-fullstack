import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductDetails = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) return <p className="text-center text-gray-500 mt-10">Carregando produto...</p>

  return (
    <div className="max-w-4xl mx-auto mt-4 p-6 flex flex-col md:flex-row gap-10 items-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-80 h-80 object-contain "
      />

      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-xl text-green-600 font-semibold mb-4">R$ {product.price.toFixed(2)}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Adicionar ao Carrinho
        </button>

        <div className="mt-4">
          <Link to="/" className="text-blue-500 hover:underline text-sm">← Voltar para os produtos</Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
