import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Login from "./pages/Login";
import Order from "./pages/Order";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import { useShopStore } from "./store/useShopStore";
import { useEffect } from "react";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const navigate = useNavigate();
  const setNavigate = useShopStore((state) => state.setNavigate);

  useEffect(() => {
    setNavigate(navigate);
  }, [setNavigate, navigate]);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-order" element={<Order />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
