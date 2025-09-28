import { useEffect, useState } from "react";
import api from "../../services/api";

function SellerDashboard() {
  const [stats, setStats] = useState({ sales: 0, orders: 0, balance: 0 });

  useEffect(() => {
    api.get("/seller/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Erreur chargement stats vendeur:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Tableau de Bord Vendeur</h1>

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
