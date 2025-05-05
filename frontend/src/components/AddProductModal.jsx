import React, { useState } from 'react';
import { useProductStore } from '../stores/useProductStore';

const AddProductModal = ({ onClose, onAdd }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    image: '',
    gender: ''
  });
  const { createProduct } = useProductStore()

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createProduct(newProduct)
      onAdd();
      onClose();
    } catch (error) {
      console.error(error.response?.data?.message || error.message)     
    }
  }

  // const handleSubmit = () => {
  //   fetch('/products', {
  //     method: 'POST',
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('token')
  //     },
  //     body: JSON.stringify(newProduct)
  //   }).then(res => res.json())
  //     .then((data) => {
  //       onAdd(data);
  //       onClose();
  //     });
  // };

  return (
    <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <input name="title" value={newProduct.title} onChange={handleChange} placeholder="Title" className="w-full mb-2 p-2 border rounded" />
        <input name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" type="number" className="w-full mb-2 p-2 border rounded" />
        <input name="image" value={newProduct.image} onChange={handleChange} placeholder="Image URL" className="w-full mb-4 p-2 border rounded" />
        <input name="gender" value={newProduct.gender} onChange={handleChange} placeholder="Gender" className="w-full mb-4 p-2 border rounded" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-3 py-1 rounded cursor-pointer">Cancel</button>
          <button onClick={handleSubmit} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
