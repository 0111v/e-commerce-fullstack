import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchStore } from '../stores/useSearchStore'
import { useProductStore } from '../stores/useProductStore'

const NewsPage = () => {
  // const [products, setProducts] = useState([])
  const {search, setSearch} = useSearchStore()
  const { products, getAllProducts } = useProductStore()

  // useEffect(() => {
  //   fetch('/products')
  //     .then(res => res.json())
  //     .then(data => setProducts(data))
  // }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      getAllProducts()
    }

    fetchProducts()
  })

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
      {products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())).map((product) => <ProductCard key={product._id} product={product}/>)}
      </div> 
    </div>
  )
}

export default NewsPage