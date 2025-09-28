// src/pages/seller/SellerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

/**
 * SellerDashboard rebuilt to use backend endpoints that exist:
 * - GET /orders/my-sales  -> returns seller's orders (we aggregate)
 * - GET /withdrawals/me  -> for balance context if needed
 */
export default function SellerDashboard() {
  const [stats, setStats] = useState({ sales: 0, orders: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.allSettled([api.get("/orders/my-sales"), api.get("/withdrawals/me")])
      .then(results => {
        if (!mounted) return;
        const ordersRes = results[0];
        const withdrawalsRes = results[1];

        if (ordersRes.status === "fulfilled" && Array.isArray(ordersRes.value.data)) {
          const orders = ordersRes.value.data;
          const ordersCount = orders.length;
          const salesSum = orders.reduce((acc, o) => acc + Number(o.total || 0), 0);
          setStats(prev => ({ ...prev, sales: salesSum, orders: ordersCount }));
        } else {
          toast.error("Impossible de charger les ventes.");
        }

        if (withdrawalsRes.status === "fulfilled" && Array.isArray(withdrawalsRes.value.data)) {
          const withdrawn = withdrawalsRes.value.data.reduce((acc, w) => acc + Number(w.amount || 0), 0);
          // assume balance = sales - withdrawn (approx)
          setStats(prev => ({ ...prev, balance: (prev.sales || 0) - withdrawn }));
        }
      })
      .catch(err => {
        console.error("Dashboard error:", err);
        toast.error("Erreur lors du chargement du tableau de bord.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Tableau de bord vendeur</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Ventes</div>
          <div className="text-2xl font-bold">{Number(stats.sales || 0).toLocaleString()}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Commandes</div>
          <div className="text-2xl font-bold">{stats.orders ?? 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Solde (est.)</div>
          <div className="text-2xl font-bold">{Number(stats.balance || 0).toLocaleString()} CFA</div>
        </div>
      </div>
    </div>
  );
}
