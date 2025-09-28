import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function SellerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/seller/stats")
      .then(res => setStats(res.data))
      .catch(() => toast.error("❌ Erreur lors du chargement des statistiques"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">⏳ Chargement...</p>;
  if (!stats) return <p className="p-6 text-red-500">Impossible de charger les données.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Tableau de Bord Vendeur</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg">Ventes</h2>
          <p className="text-2xl font-bold">{stats.sales}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg">Commandes</h2>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg">Solde</h2>
          <p className="text-2xl font-bold">{stats.balance} CFA</p>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
