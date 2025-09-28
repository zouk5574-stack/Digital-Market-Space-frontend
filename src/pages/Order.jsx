import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Erreur fetch commandes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/validate`);
      fetchOrders();
    } catch (err) {
      console.error("Erreur validation commande:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Commandes 🛒</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded shadow bg-white flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Client :</strong> {order.user_email}
                </p>
                <p>
                  <strong>Produit :</strong> {order.product_name}
                </p>
                <p>
                  <strong>Statut :</strong>{" "}
                  <span
                    className={
                      order.status === "validé"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {order.status}
                  </span>
                </p>
              </div>
              {order.status !== "validé" && (
                <button
                  onClick={() => handleValidate(order.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Valider
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
