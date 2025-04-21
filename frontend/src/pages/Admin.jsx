import React, { useEffect, useState } from 'react'
import AdminProduct from '../components/AdminProduct'
import AddProductModal from '../components/AddProductModal'

const Admin = () => {
  const [ products, setProducts] = useState([])
  const [ showModal, setShowModal] = useState(false)

  const handleUpdate = (id, editedProduct) => {
    setProducts(
      products.map((product) => 
        product._id === id ? {...product, ...editedProduct} : product
      )
    )
  }

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product._id !== id))
  }

  useEffect(() => {
    fetch(("http://localhost:5000/products"))
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  
  return (
    <div>
      <div className='flex justify-between'>
      <button onClick={() => setShowModal(true)} className='bg-green-500 text-white px-4 py-2 mb-4 ml-4 hover:bg-green-600 rounded cursor-pointer'>Add a new product</button>
      <button onClick={() => {
          localStorage.removeItem('token')
          window.location.reload()
        }} 
        className='bg-blue-500 text-white px-4 py-2 mb-4 mr-4 hover:bg-blue-600 rounded cursor-pointer'>Logout</button>
      </div>
      {showModal && (
        <AddProductModal onClose={() => setShowModal(false)} onAdd={(newProduct) => setProducts([...products, newProduct])} />
      )}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {products.map((product) => <AdminProduct key={product._id} product={product} onDelete={handleDelete} onUpdate={handleUpdate}/>)}
        </div>
      </div>
    </div>
  )
}

export default Admin