import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./hooks/useUserContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import OurProducts from "./pages/OurProducts";
import Men from "./pages/MenProducts";
import Women from "./pages/WomenProducts";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Account from "./pages/Account";

function App() {
  const { user } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<OurProducts />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/account"
              element={!user ? <Navigate to="/" /> : <Account />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
