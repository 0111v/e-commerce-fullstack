import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

const AccsPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/products?gender=acc')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
        {products.map((product) => <ProductCard key={product._id} product={product}/>)}
      </div> 
    </div>
  )
}

export default AccsPage