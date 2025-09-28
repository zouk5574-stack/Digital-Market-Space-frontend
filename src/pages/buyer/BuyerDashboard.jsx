import { useEffect, useState } from "react";
import api from "../../services/api";

function BuyerDashboard() {
  const [stats, setStats] = useState({ orders: 0, spent: 0 });

  useEffect(() => {
    api.get("/buyer/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Erreur chargement stats acheteur:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Tableau de Bord Acheteur</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg">Commandes</h2>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg">Total Dépensé</h2>
          <p className="text-2xl font-bold">{stats.spent} CFA</p>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
