import React, { use, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useProductStore } from '../stores/useProductStore'

const AccsPage = () => {
  const { products, getProductsByQuery } = useProductStore()
  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   fetch('/products?gender=acc')
  //     .then(res => res.json())
  //     .then(data => setProducts(data))
  // }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      const query = 'gender=acc'
      await getProductsByQuery(query)
    }

    fetchProducts()
  })

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
        {products.map((product) => <ProductCard key={product._id} product={product}/>)}
      </div> 
    </div>
  )
}

export default AccsPage