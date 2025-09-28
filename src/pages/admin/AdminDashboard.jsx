import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data)).catch(()=>{});
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-4">Dashboard Admin</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card"><div>Utilisateurs</div><div className="text-xl font-bold">{stats.users || 0}</div></div>
        <div className="card"><div>Vendeurs</div><div className="text-xl font-bold">{stats.sellers || 0}</div></div>
        <div className="card"><div>Commandes</div><div className="text-xl font-bold">{stats.orders || 0}</div></div>
        <div className="card"><div>Revenus</div><div className="text-xl font-bold">{stats.revenue || 0} CFA</div></div>
      </div>
    </div>
  );
}
