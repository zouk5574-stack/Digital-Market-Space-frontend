// src/pages/admin/DashboardHome.jsx

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    users: 0,
    sellers: 0,
    orders: 0,
    transactions: 0,
    revenue: 0,
    ordersByMonth: [],
    salesByCategory: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        if (res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Erreur chargement stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6">Chargement des statistiques...</div>;
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Vue d’ensemble</h1>

      {/* Cartes de stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium">Utilisateurs</h2>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium">Vendeurs</h2>
          <p className="text-3xl font-bold">{stats.sellers}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium">Commandes</h2>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium">Transactions</h2>
          <p className="text-3xl font-bold">{stats.transactions}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 md:col-span-2">
          <h2 className="text-lg font-medium">Revenus totaux</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.revenue.toLocaleString()} FCFA
          </p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Commandes par mois */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Évolution des commandes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.ordersByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#0088FE"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition des ventes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">
            Répartition des ventes par catégorie
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.salesByCategory}
                dataKey="value"
                nameKey="category"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {stats.salesByCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
                }
