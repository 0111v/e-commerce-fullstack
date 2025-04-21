import React, { useEffect, useState } from 'react'
// import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'

const Home = () => {
  const [ products, setProducts] = useState([])
  const { search, setSearch} = useCart()

  useEffect(() => {
    fetch(("http://localhost:5000/products"))
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>Produtos</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())).map((product) => <ProductCard key={product._id} product={product}/>)}
      </div>
    </div>
  )
}

export default Home