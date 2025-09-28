// src/pages/seller/Orders.jsx
// Hypothèse : backend expose GET /api/orders/my-sales and PUT /api/orders/:id/status

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});

  useEffect(() => {
    let mounted = true;
    api.get("/orders/my-sales")
      .then(res => { if (mounted) setOrders(Array.isArray(res.data) ? res.data : []); })
      .catch(err => { console.error(err); toast.error("Impossible de charger vos ventes."); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const changeStatus = async (id, status) => {
    setProcessing(prev => ({ ...prev, [id]: true }));
    try {
      await api.put(`/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      toast.success("Statut mis à jour.");
    } catch (err) {
      console.error(err);
      toast.error("Erreur mise à jour statut.");
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Commandes (mes ventes)</h1>
      {orders.length === 0 ? <div>Aucune commande.</div> : (
        <ul className="space-y-3">
          {orders.map(o => (
            <li key={o.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">Commande #{o.id}</div>
                <div className="text-sm text-gray-500">{o.items?.length || 0} articles — {Number(o.total || 0).toLocaleString()} CFA</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm">{o.status}</div>
                <button disabled={processing[o.id]} onClick={() => changeStatus(o.id, "completed")} className="px-2 py-1 bg-green-600 text-white rounded">Mark completed</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
