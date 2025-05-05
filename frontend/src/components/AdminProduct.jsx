import React, { useState } from 'react'
import { useProductStore } from '../stores/useProductStore'

const AdminProduct = ({product, onSuccess}) => {
  const { updateProduct, deleteProduct } = useProductStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    price: product.price,
    image: product.image,
    gender: product.gender
  })

  const handleEditChange = (e) => {
    setEditedProduct({...editedProduct, [e.target.name]: e.target.value})
  }

  const handleDelete = async () => {
    deleteProduct(product._id)
    onSuccess()
  }

  const handleSave = async () => {
    updateProduct(product._id, editedProduct)
    onSuccess()
    setIsEditing(false)
  }


  // const handleSave = () => {
  //   fetch(`/products/${product._id}`, {
  //     method: 'put',
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('token')
  //     },
  //     body: JSON.stringify(editedProduct)
  //   }).then((res) => {
  //     onUpdate(product._id, editedProduct)
  //     setIsEditing(false)
  //   })
  // }

  // const handleDelete = () => {
  //   fetch(`/products/${product._id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': 'Bearer ' + localStorage.getItem('token')
  //     }
  //   }).then((res) => {
  //     if (res.ok) {
  //       onDelete(product._id)
  //     }
  //   })
  // }

  return (
    <div className='border rounded-lg p-4 shadow-md mb-4'>
      {isEditing ? 
        <>
          <input 
            type="text"
            name='title'
            value={editedProduct.title}
            onChange={(e) => handleEditChange(e)}
            className='block w-full mb-2 p-1 border rounded'
          />
          <input 
            type="number"
            name='price'
            value={editedProduct.price}
            onChange={(e) => handleEditChange(e)}
            className='block w-full mb-2 p-1 border rounded'
          />
          <input 
            type="text"
            name='image'
            value={editedProduct.image}
            onChange={(e) => handleEditChange(e)}
            className='block w-full mb-2 p-1 border rounded'
          />
          <input 
            type="text"
            name='gender'
            value={editedProduct.gender}
            onChange={(e) => handleEditChange(e)}
            className='block w-full mb-2 p-1 border rounded'
          />
          <div className='flex gap-2 mt-4'>
            <button onClick={handleSave} className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer'>save</button>
            <button onClick={() => setIsEditing(false)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer'>cancel</button>
          </div>
        </> 
        : 
        <>
          <div className='px-4 py-2 flex flex-col flex-grow justify-center items-center' >
            <img className='h-80 object-contain' src={product.image} alt="" />
            <p className='text-xl font-bold'>{product.title}</p>
            <p className='text-gray-700'>R$ {product.price}</p>
            <div className='flex gap-2 mt-4'>
              <button onClick={() => setIsEditing(true)} className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer'>Edit</button>
              <button onClick={handleDelete} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer'>Delete</button>
            </div>
          </div>
        </>}
    </div>
  )
}

export default AdminProduct