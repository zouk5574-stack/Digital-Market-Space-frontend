import { useEffect, useState } from "react";
import api from "../../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/buyer/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Erreur chargement commandes:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Mes Commandes</h1>

      <ul>
        {orders.map(order => (
          <li key={order.id} className="border p-4 mb-2 rounded">
            <p><b>Produit:</b> {order.productName}</p>
            <p><b>Montant:</b> {order.amount} CFA</p>
            <p><b>Statut:</b> {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
