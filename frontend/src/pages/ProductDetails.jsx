import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import { useCart } from '../context/CartContext'
import { useCartStore } from '../stores/useCartStore'
import { useProductStore } from '../stores/useProductStore'

const ProductDetails = () => {
  const { id } = useParams()
  const { addToCart } = useCartStore()
  const [product, setProduct] = useState(null)
  const { getProductById } = useProductStore()

  // useEffect(() => {
  //   fetch(`/products/${id}`)
  //     .then(res => res.json())
  //     .then(data => setProduct(data))
  // }, [id])

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProductById(id)
      setProduct(res)
    }

    fetchProduct()
  })

  return (
    <div className="max-w-4xl mx-auto mt-4 p-6 grid grid-cols-1 md:grid-cols-2">
      {product ? 
        <>
          <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-150 object-contain "
          />
          </div>

          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-xl text-green-600 font-semibold mb-4">R$ {product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <button
              onClick={() => addToCart(product)}
              className="bg-black text-white text-md font-semibold py-2 px-8 rounded hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Adicionar ao Carrinho
            </button>

            <div className="mt-4">
              <Link to="/" className="text-blue-500 hover:underline text-sm">
                ← Voltar para os produtos
              </Link>
            </div>
          </div>
        </>
        : 
        <>Loading</>}
    </div>
  )
}

export default ProductDetails
