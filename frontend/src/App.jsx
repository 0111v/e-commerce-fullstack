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
import Login from "./pages/Login";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import Register from "./pages/Register";

function App() {
  const { user, getProfile } = useUserStore()
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/admin')
  }

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile()
    }

    fetchProfile()
  }, [])

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
          user?.role === 'admin' ? <Admin /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* {console.log(user)} */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
