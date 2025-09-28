import { useEffect, useState } from "react";
import api from "../../services/api";

function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    api.get("/admin/withdrawals")
      .then(res => setWithdrawals(res.data))
      .catch(err => console.error("Erreur retraits:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏦 Retraits</h1>
      <table className="w-full border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map(w => (
            <tr key={w.id} className="border-t">
              <td className="p-2">{w.id}</td>
              <td className="p-2">{w.user_name}</td>
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

export default Withdrawals;
