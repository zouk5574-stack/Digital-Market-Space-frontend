import { useEffect, useState } from "react";
import api from "../../services/api";

function BuyerDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/buyer/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Erreur stats acheteur:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">👤 Dashboard Acheteur</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-lg font-bold">Commandes passées</h2>
          <p>{stats.orders}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="text-lg font-bold">Montant dépensé</h2>
          <p>{stats.spent} CFA</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="text-lg font-bold">Produits favoris</h2>
          <p>{stats.favorites}</p>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
