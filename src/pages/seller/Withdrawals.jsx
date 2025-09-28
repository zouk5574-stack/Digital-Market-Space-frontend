import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/withdrawals/me")
      .then(res => setWithdrawals(res.data))
      .catch(() => toast.error("❌ Erreur lors du chargement des retraits"))
      .finally(() => setLoading(false));
  }, []);

  const handleWithdraw = () => {
    const value = parseFloat(amount);

    if (isNaN(value) || value <= 0) {
      toast.error("Veuillez entrer un montant valide.");
      return;
    }

    api.post("/withdrawals", { amount: value })
      .then(res => {
        toast.success("✅ Retrait demandé avec succès !");
        setWithdrawals([...withdrawals, res.data]);
        setAmount("");
      })
      .catch(() => toast.error("❌ Erreur lors du retrait"));
  };

  if (loading) return <p className="p-6">⏳ Chargement...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💵 Mes Retraits</h1>

      <div className="mb-6 flex items-center">
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
      {withdrawals.length === 0 ? (
        <p>Aucun retrait effectué pour le moment.</p>
      ) : (
        <ul>
          {withdrawals.map(w => (
            <li key={w.id} className="border p-2 mb-2 rounded">
              {w.amount} CFA – {w.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Withdrawals;
