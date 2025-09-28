// src/pages/admin/AdminDashboard.jsx

import React, { useState } from "react";
import DashboardHome from "./DashboardHome";
import Users from "./Users";
import Sellers from "./Sellers";
import Products from "./Products";
import Orders from "./Orders";
import Transactions from "./Transactions";
import Withdrawals from "./Withdrawals";
import Settings from "./Settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Menu items
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "users", label: "Utilisateurs" },
    { key: "sellers", label: "Vendeurs" },
    { key: "products", label: "Produits" },
    { key: "orders", label: "Commandes" },
    { key: "transactions", label: "Transactions" },
    { key: "withdrawals", label: "Retraits" },
    { key: "settings", label: "Réglages" },
  ];

  // Rendu dynamique
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "users":
        return <Users />;
      case "sellers":
        return <Sellers />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "transactions":
        return <Transactions />;
      case "withdrawals":
        return <Withdrawals />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === item.key
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
    </div>
  );
}
