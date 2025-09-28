import { useEffect, useState } from "react";
import api from "../../services/api";

function SellerWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    api.get("/seller/withdrawals")
      .then(res => setWithdrawals(res.data))
      .catch(err => console.error("Erreur chargement retraits:", err));
  }, []);

  const requestWithdrawal = () => {
    api.post("/seller/withdrawals", { amount })
      .then(res => {
        setWithdrawals([...withdrawals, res.data]);
        setAmount("");
      })
      .catch(() => alert("❌ Erreur demande retrait"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💰 Retraits</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Montant"
          className="border p-2 rounded w-1/3"
        />
        <button onClick={requestWithdrawal} className="px-4 py-2 bg-green-600 text-white rounded">
          Demander Retrait
        </button>
      </div>

      <table className="w-full border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map(w => (
            <tr key={w.id} className="border-t">
              <td className="p-2">{w.id}</td>
              <td className="p-2">{w.amount} CFA</td>
              <td className="p-2">{w.status}</td>
              <td className="p-2">{new Date(w.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerWithdrawals;
