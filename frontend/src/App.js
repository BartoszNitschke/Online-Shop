import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./hooks/useUserContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const { user } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/product/:id" />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
