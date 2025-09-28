import { useEffect, useState } from "react";
import api from "../../services/api";

function SellerDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/seller/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Erreur stats vendeur:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🏪 Tableau de bord Vendeur</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatBox title="📦 Produits" value={stats.products} />
        <StatBox title="🛒 Commandes" value={stats.orders} />
        <StatBox title="💵 Revenus" value={`${stats.revenue} CFA`} />
        <StatBox title="💸 Retraits" value={stats.withdrawals} />
        <StatBox title="💬 Messages" value={stats.messages} />
      </div>
    </div>
  );
}

function StatBox({ title, value }) {
  return (
    <div className="p-4 bg-gray-50 shadow rounded">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-xl font-bold">{value || 0}</p>
    </div>
  );
}

export default SellerDashboard;
