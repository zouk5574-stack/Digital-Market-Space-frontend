import { useEffect, useState } from "react";
import api from "../../services/api";

function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    api.get("/withdrawals/me")
      .then(res => setWithdrawals(res.data))
      .catch(err => console.error("Erreur chargement retraits:", err));
  }, []);

  const handleWithdraw = () => {
    api.post("/withdrawals", { amount })
      .then(res => {
        alert("✅ Retrait demandé avec succès !");
        setWithdrawals([...withdrawals, res.data]);
        setAmount("");
      })
      .catch(() => alert("❌ Erreur lors du retrait"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💵 Mes Retraits</h1>

      <div className="mb-6">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Montant à retirer"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleWithdraw}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Demander un retrait
        </button>
      </div>

      <h2 className="text-xl mb-2">📜 Historique</h2>
      <ul>
        {withdrawals.map(w => (
          <li key={w.id} className="border p-2 mb-2 rounded">
            {w.amount} CFA – {w.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Withdrawals;
