import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";

// Admin, Seller, Buyer pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Settings from "./pages/admin/Settings";
import Users from "./pages/admin/Users";
import Payments from "./pages/admin/Payments";

import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/Products";
import SellerWithdrawals from "./pages/seller/Withdrawals";

import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BuyerOrders from "./pages/buyer/Orders";

import ProtectedRoute from "./components/ui/ProtectedRoute";
import { AuthProvider } from "./utils/useAuth";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Admin protected */}
            <Route path="admin">
              <Route index element={<ProtectedRoute roles={['admin']}><AdminDashboard/></ProtectedRoute>} />
              <Route path="settings" element={<ProtectedRoute roles={['admin']}><Settings/></ProtectedRoute>} />
              <Route path="users" element={<ProtectedRoute roles={['admin']}><Users/></ProtectedRoute>} />
              <Route path="payments" element={<ProtectedRoute roles={['admin']}><Payments/></ProtectedRoute>} />
            </Route>

            {/* Seller */}
            <Route path="seller">
              <Route index element={<ProtectedRoute roles={['seller']}><SellerDashboard/></ProtectedRoute>} />
              <Route path="products" element={<ProtectedRoute roles={['seller']}><SellerProducts/></ProtectedRoute>} />
              <Route path="withdrawals" element={<ProtectedRoute roles={['seller']}><SellerWithdrawals/></ProtectedRoute>} />
            </Route>

            {/* Buyer */}
            <Route path="buyer">
              <Route index element={<ProtectedRoute roles={['buyer']}><BuyerDashboard/></ProtectedRoute>} />
              <Route path="orders" element={<ProtectedRoute roles={['buyer']}><BuyerOrders/></ProtectedRoute>} />
            </Route>

          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<AppRoutes />);
