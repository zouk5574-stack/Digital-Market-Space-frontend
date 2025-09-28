import { useEffect, useState } from "react";
import api from "../../services/api";

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/seller/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Erreur chargement commandes:", err));
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/seller/orders/${id}`, { status })
      .then(() => {
        setOrders(orders.map(o => (o.id === id ? { ...o, status } : o)));
      })
      .catch(() => alert("❌ Erreur mise à jour statut"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📑 Commandes reçues</h1>
      <table className="w-full border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Produit</th>
            <th>Acheteur</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.product_name}</td>
              <td className="p-2">{o.buyer_name}</td>
              <td className="p-2">{o.amount} CFA</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => updateStatus(o.id, "expédié")} className="px-2 py-1 bg-blue-500 text-white rounded">
                  Expédier
                </button>
                <button onClick={() => updateStatus(o.id, "annulé")} className="px-2 py-1 bg-red-500 text-white rounded">
                  Annuler
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerOrders;
