import { useEffect, useState } from "react";
import api from "../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await api.get("/payments");
      setPayments(res.data);
    } catch (err) {
      console.error("Erreur fetch paiements:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/payments", {
        order_id: orderId,
        amount,
      });

      alert("Paiement initié ✅");
      setAmount("");
      setOrderId("");
      fetchPayments();
    } catch (err) {
      console.error("Erreur création paiement:", err);
    }
  };

  const handleCheckStatus = async (paymentId) => {
    try {
      const res = await api.get(`/payments/${paymentId}/status`);
      alert(`Statut paiement: ${res.data.status}`);
      fetchPayments();
    } catch (err) {
      console.error("Erreur vérification statut:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Paiements 💳</h1>

      {/* Création paiement */}
      <form
        onSubmit={handleCreatePayment}
        className="space-y-4 border p-4 rounded mb-6"
      >
        <input
          type="text"
          placeholder="ID commande"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="number"
          placeholder="Montant"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Initier Paiement
        </button>
      </form>

      {/* Liste paiements */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-4">
          {payments.map((pay) => (
            <div
              key={pay.id}
              className="p-4 border rounded shadow bg-white flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Commande :</strong> {pay.order_id}
                </p>
                <p>
                  <strong>Montant :</strong> {pay.amount} CFA
                </p>
                <p>
                  <strong>Statut :</strong>{" "}
                  <span
                    className={
                      pay.status === "paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {pay.status}
                  </span>
                </p>
              </div>
              {pay.status !== "paid" && (
                <button
                  onClick={() => handleCheckStatus(pay.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Vérifier Statut
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Payments;
