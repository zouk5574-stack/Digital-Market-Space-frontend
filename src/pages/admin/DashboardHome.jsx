// src/pages/admin/DashboardHome.jsx

import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    users: 0,
    sellers: 0,
    orders: 0,
    transactions: 0,
    revenue: 0,
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Vue d’ensemble</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}
