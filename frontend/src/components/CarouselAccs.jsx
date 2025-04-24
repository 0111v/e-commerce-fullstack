import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useEffect, useState } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Link } from 'react-router-dom'


const CarouselAccs = () => {
  
  
  
  const [ products, setProducts] = useState([])

  useEffect(() => {
    fetch("/products?gender=acc")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          0: { slidesPerView: 1 , slidesPerGroup: 1},
          768: { slidesPerView: 2 , slidesPerGroup: 2},
          1280: { slidesPerView: 3 , slidesPerGroup: 3}
        }}
        className="rounded-2xl"
      >
        {products.map((item) => (
          <SwiperSlide key={item._id}>
            <Link to={`/product/${item._id}`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarouselAccs
