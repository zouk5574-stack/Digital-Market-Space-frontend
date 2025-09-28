// src/pages/buyer/Orders.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("/orders/my-orders")
      .then(res => {
        if (mounted) setOrders(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Erreur chargement commandes:", err);
        toast.error("Impossible de charger vos commandes.");
      })
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mes commandes</h1>
      {orders.length === 0 ? (
        <div className="text-sm text-gray-500">Aucune commande trouvée.</div>
      ) : (
        <ul className="space-y-3">
          {orders.map(order => (
            <li key={order.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
              <div>
                <div className="font-medium">Commande #{order.id}</div>
                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()} - {order.items?.length || 0} articles
                </div>
                <div className="text-sm text-gray-600">
                  Total: {Number(order.total || 0).toLocaleString()} CFA
                </div>
              </div>
              <div className={`font-semibold text-sm ${order.status === "pending" ? "text-yellow-600" : order.status === "completed" ? "text-green-600" : "text-red-600"}`}>
                {order.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
