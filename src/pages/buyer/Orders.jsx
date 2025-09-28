import { useEffect, useState } from "react";
import api from "../../services/api";

function BuyerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/buyer/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Erreur commandes acheteur:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Mes Commandes</h1>
      <table className="w-full border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Produit</th>
            <th>Vendeur</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.product_name}</td>
              <td className="p-2">{o.seller_name}</td>
              <td className="p-2">{o.amount} CFA</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2">{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BuyerOrders;
