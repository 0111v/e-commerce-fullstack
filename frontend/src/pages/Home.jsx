import React, { useEffect, useState } from 'react'
// import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
// import { useCart } from '../context/CartContext'
import Carousel from '../components/Carousel'
import { Truck, ShieldCheck, BadgeCheck } from "lucide-react"
import { Link } from 'react-router-dom'
import CarouselAccs from '../components/CarouselAccs'


const Home = () => {

  return (
    <div className='max-w-7xl mx-auto  '>
      
      <div class="max-w-screen-xl mx-auto  grid grid-cols-1 md:grid-cols-2">
        <div className='relative'>
          <img src="https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" 
            className='h-180 md:h-full w-full object-cover '/>
          <div className="absolute inset-0 flex items-center justify-center mt-60">
            <Link to={'/womans'}>
              <h2 className=" underline text-gray-200 font-playfair text-6xl font-bold">
                Coleção <br />Feminina
              </h2>
            </Link>
          </div>
        </div>

        <div className='relative'>
          <img src="https://images.unsplash.com/photo-1642886513133-cdbee2639272?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" 
            className='h-180 md:h-full w-full object-cover'/>
          <div className="absolute inset-0 flex items-center justify-center mt-60">
            <Link to={'/mens'}>
              <h2 className="underline text-gray-200 font-playfair text-6xl font-bold ">
                Coleção <br />Masculina
              </h2>
            </Link>
          </div>
        </div>
      </div>
      
      <h2 className="text-center mt-16 text-gray-800 font-playfair text-6xl ">
        Lançamentos
      </h2>
      <Carousel />
      <div className='flex item-center mb-16'>
        <Link to={'/news'} className='px-8 py-2 mx-auto text-center bg-black text-white hover:bg-gray-800 active:bg-gray-600'>
          Ver todos
        </Link>
      </div>

      <h2 className="text-center mt-8 text-gray-800 font-playfair text-6xl ">
        Acessórios
      </h2>
      <CarouselAccs />
      <div className='flex item-center mb-16'>
        <Link to={'/accs'} className='px-8 py-2 mx-auto text-center bg-black text-white hover:bg-gray-800 active:bg-gray-600'>
          Ver todos
        </Link>
      </div>
      
      <section className="py-10 mt-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          <div className="bg-white rounded-2xl  p-6 flex flex-col items-center">
            <Truck className="w-30 h-30 text-gray-700 mb-5" />
            <h4 className="text-lg font-semibold mb-2">
              Entrega Rápida
            </h4>
            <p className="text-gray-600">
              Receba seus produtos com agilidade e segurança.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
            <ShieldCheck className="w-30 h-30 text-gray-700 mb-5" />
            <h4 className="text-lg font-semibold mb-2">
              Site Seguro
            </h4>
            <p className="text-gray-600">
              Ambiente protegido para uma compra tranquila.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
            <BadgeCheck className="w-30 h-30 text-gray-700 mb-5" />
            <h4 className="text-lg font-semibold mb-2">
              Qualidade Garantida
            </h4>
            <p className="text-gray-600">
              Peças selecionadas com excelência e sofisticação.
            </p>
          </div>

        </div>
      </section>

      {/* <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>Produtos</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())).map((product) => <ProductCard key={product._id} product={product}/>)}
      </div> */}
    </div>
  )
}

export default Home