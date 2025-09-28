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
// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  ShoppingCart,
  DollarSign,
  RefreshCcw,
  Store,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import DashboardHome from "./DashboardHome";
import Users from "./Users";
import Sellers from "./Sellers";
import Products from "./Products";
import Orders from "./Orders";
import Transactions from "./Transactions";
import Withdrawals from "./Withdrawals";
import Settings from "./Settings";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users as UsersIcon,
  ShoppingCart,
  DollarSign,
  RefreshCcw,
  Store,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les stats uniquement pour l’onglet dashboard
  useEffect(() => {
    if (activeTab !== "dashboard") return;
    (async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Erreur chargement stats:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeTab]);

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
        if (loading) return <div className="p-6">Chargement...</div>;
        if (!stats) return <div className="p-6 text-red-500">Impossible de charger les statistiques</div>;

        return (
          <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Tableau de bord Administrateur</h1>

            {/* Cartes des stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-blue-500" /> Utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{stats.users}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-purple-500" /> Vendeurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{stats.sellers}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-green-500" /> Commandes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{stats.orders}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCcw className="w-5 h-5 text-yellow-500" /> Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{stats.transactions}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-red-500" /> Revenus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{stats.revenue} FCFA</p>
                </CardContent>
              </Card>
            </div>

            {/* Graphique commandes par mois */}
            <div className="bg-white rounded-2xl shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Évolution des commandes</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.ordersByMonth || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
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
