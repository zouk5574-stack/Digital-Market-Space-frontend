import { useEffect, useState } from "react";
import api from "../../services/api";

function SellerDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/seller/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Erreur stats vendeur:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard Vendeur</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-lg font-bold">Produits</h2>
          <p>{stats.products}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="text-lg font-bold">Commandes</h2>
          <p>{stats.orders}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="text-lg font-bold">Revenus</h2>
          <p>{stats.revenue} CFA</p>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
