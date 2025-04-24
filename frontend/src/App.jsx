import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin"
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";
import MensPage from "./pages/MensPage";
import WomansPage from "./pages/WomansPage";
import AccsPage from "./pages/AccsPage";
import NewsPage from "./pages/NewsPage";

function App() {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/admin')
  }
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mens" element={<MensPage />} />
        <Route path="/womans" element={<WomansPage />} />
        <Route path="/accs" element={<AccsPage />}/>
        <Route path="/news" element={<NewsPage/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin}/>} />
        <Route path="/admin" element={
          localStorage.getItem('token') ? <Admin /> : <Navigate to={'/admin-login'} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
