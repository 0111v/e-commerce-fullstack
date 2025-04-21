import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart, search, setSearch } = useCart();
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/e-commerce') {
      setSearch('')
    }
  }, [location.pathname])

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">
          <Link to="/">E-Commerce</Link>
        </div>

        <div className="w-1/3">
          <input
            type="text"
            placeholder="Buscar produto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-6 text-sm font-medium text-gray-700">
          {/* <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> */}
          <Link to="/cart" className="hover:text-blue-600 transition-colors">
            Carrinho ({cart.length})
          </Link>
          <Link to="/" className="hover:text-blue-600 transition-colors">Contato</Link>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-blue-600">
            <Link to="/">E-Commerce</Link>
          </div>

          <div className="flex gap-4 text-sm font-medium text-gray-700">
            {/* <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> */}
            <Link to="/cart" className="hover:text-blue-600 transition-colors">
              Carrinho ({cart.length})
            </Link>
            <Link to="/" className="hover:text-blue-600 transition-colors">Contato</Link>
          </div>
        </div>

        <input
          type="text"
          placeholder="Buscar produto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </nav>
  );
};

export default Navbar;
