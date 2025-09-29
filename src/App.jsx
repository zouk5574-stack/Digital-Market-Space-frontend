import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";
import Withdrawals from "./pages/Withdrawals";
import Messages from "./pages/Messages";
import Parametres from "./pages/Parametres";

import ProtectedRoute from "./components/ProtectedRoute";
import SellerDashboard from "./pages/seller/SellerDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/withdrawals" element={<Withdrawals />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Parametres />} />
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute role="seller">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
