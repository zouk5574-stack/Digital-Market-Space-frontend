// src/pages/seller/Withdrawals.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("/withdrawals/me")
      .then(res => {
        if (!mounted) return;
        setWithdrawals(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Erreur chargement retraits:", err);
        toast.error("Impossible de charger l'historique des retraits.");
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const validateAmount = (val) => {
    const n = Number(val);
    return !Number.isNaN(n) && n > 0;
  };

  const handleWithdraw = async (e) => {
    e?.preventDefault?.();
    if (!validateAmount(amount)) {
      toast.error("Montant invalide. Saisissez un nombre supérieur à 0.");
      return;
    }
    setSubmitting(true);
    try {
      const body = { amount: Number(amount) };
      const res = await api.post("/withdrawals", body);
      if (res?.data) {
        setWithdrawals(prev => [res.data, ...prev]);
        setAmount("");
        toast.success("Demande de retrait envoyée.");
      } else {
        toast.success("Demande envoyée.");
      }
    } catch (err) {
      console.error("Erreur création retrait:", err);
      const msg = err?.response?.data?.message || "Erreur lors de la création du retrait.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Retraits</h1>

      <section className="mb-6 bg-white p-4 rounded shadow">
        <form onSubmit={handleWithdraw} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant (CFA)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: 5000"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60`}
            >
              {submitting ? "Envoi..." : "Demander retrait"}
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-medium mb-2">Historique des retraits</h2>

        {loading ? (
          <div>Chargement...</div>
        ) : withdrawals.length === 0 ? (
          <div className="text-sm text-gray-500">Aucun retrait enregistré.</div>
        ) : (
          <ul className="space-y-2">
            {withdrawals.map(w => (
              <li key={w.id} className="border p-3 rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">{Number(w.amount).toLocaleString()} CFA</div>
                  <div className="text-sm text-gray-500">{new Date(w.createdAt || w.date || Date.now()).toLocaleString()}</div>
                </div>
                <div className={`text-sm font-medium ${w.status === "pending" ? "text-yellow-600" : w.status === "completed" ? "text-green-600" : "text-red-600"}`}>
                  {w.status}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
