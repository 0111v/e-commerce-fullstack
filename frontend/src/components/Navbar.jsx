import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
import { Search } from 'lucide-react';
import { useSearchStore } from '../stores/useSearchStore';
import { useCartStore } from '../stores/useCartStore';

const Navbar = () => {
  
  const { cart } = useCartStore();
  const { search, setSearch } = useSearchStore()  
  const location = useLocation()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (location.pathname !== '/e-commerce') {
  //     setSearch('')
  //   }
  // }, [location.pathname])

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50 font-playfair">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-3xl font-bold text-black">
          <Link to="/">E-Commerce</Link>
        </div>

        <div className="w-1/3 flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar produto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate('/news')
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search 
            onClick={() => navigate('/news')}
            className='h-full w-9 cursor-pointer'/>
        </div>

        <div className="flex gap-6 text-sm font-medium text-gray-700">
          {/* <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> */}
          <Link to="/cart" className="text-xl hover:text-blue-600 transition-colors">
            Carrinho ({cart.length})
          </Link>
          <Link to="/" className="text-xl hover:text-blue-600 transition-colors">Contato</Link>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-black">
            <Link to="/">E-Commerce</Link>
          </div>

          <div className="flex gap-4 text-sm font-medium text-gray-700">
            {/* <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> */}
            <Link to="/cart" className="hover:text-blue-600 transition-colors">
              Carrinho ({cart.length})
            </Link>
            <Link to="https://www.linkedin.com/in/victor-oliveira-855844249/" className="hover:text-blue-600 transition-colors">Contato</Link>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <input
            type="text"
            placeholder="Buscar produto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate('/news')
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search 
            onClick={() => navigate('/news')}
            className='h-full w-9 cursor-pointer'/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
