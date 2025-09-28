import { useEffect, useState } from "react";
import api from "../services/api";

function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const res = await api.get("/withdrawals");
      setWithdrawals(res.data);
    } catch (err) {
      console.error("Erreur fetch retraits:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestWithdrawal = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/withdrawals", { amount });
      alert("Demande de retrait envoyée ✅");
      setAmount("");
      fetchWithdrawals();
    } catch (err) {
      console.error("Erreur demande retrait:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes Retraits 💵</h1>

      {/* Formulaire demande retrait */}
      <form
        onSubmit={handleRequestWithdrawal}
        className="space-y-4 border p-4 rounded mb-6"
      >
        <input
          type="number"
          placeholder="Montant à retirer"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Demander Retrait
        </button>
      </form>

      {/* Liste retraits */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-4">
          {withdrawals.map((w) => (
            <div
              key={w.id}
              className="p-4 border rounded shadow bg-white flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Montant :</strong> {w.amount} CFA
                </p>
                <p>
                  <strong>Statut :</strong>{" "}
                  <span
                    className={
                      w.status === "completed"
                        ? "text-green-600"
                        : w.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {w.status}
                  </span>
                </p>
                <p>
                  <strong>Date :</strong>{" "}
                  {new Date(w.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Withdrawals;
