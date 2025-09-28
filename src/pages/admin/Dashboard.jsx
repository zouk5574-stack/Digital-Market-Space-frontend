import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Erreur récupération stats admin:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📊 Tableau de bord Administrateur</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox title="👥 Utilisateurs" value={stats.users} />
        <StatBox title="🛍 Vendeurs" value={stats.sellers} />
        <StatBox title="👤 Acheteurs" value={stats.buyers} />
        <StatBox title="📦 Commandes" value={stats.orders} />
        <StatBox title="💳 Paiements" value={stats.payments} />
        <StatBox title="💸 Retraits" value={stats.withdrawals} />
        <StatBox title="⚡ Revenus" value={`${stats.revenue} CFA`} />
        <StatBox title="🔔 Notifications" value={stats.notifications} />
      </div>
    </div>
  );
}

function StatBox({ title, value }) {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-xl font-bold">{value || 0}</p>
    </div>
  );
}

export default AdminDashboard;
