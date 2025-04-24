import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#edede9] text-gray-700 px-6 py-12 mt-20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

    <div>
      <h3 className="font-playfair text-2xl font-semibold">E-Commerce</h3>
      <p className="mt-2 text-gray-500">Luxury. Refined. You.</p>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Shop</h4>
      <ul className="space-y-1 text-gray-500">
        <li><a href="#">Feminino</a></li>
        <li><a href="#">Masculino</a></li>
        <li><a href="#">Novidades</a></li>
        <li><a href="#">Coleções</a></li>
      </ul>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Siga-nos</h4>
      <ul className="space-y-1 text-gray-500">
        <li><a href="#">Instagram</a></li>
        <li><a href="#">Pinterest</a></li>
        <li><a href="#">YouTube</a></li>
      </ul>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Newsletter</h4>
      <p className="text-gray-500 mb-2">Receba novidades exclusivas.</p>
      <input
        type="email"
        placeholder="Seu email"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  </div>

  <div className="mt-12 text-center text-xs text-gray-400">
    © {new Date().getFullYear()} E-Commerce. Todos os direitos reservados.
  </div>
</footer>

    </div>
  )
}

export default Footer