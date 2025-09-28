import { useEffect, useState } from "react";
import api from "../../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get("/admin/payments")
      .then(res => setPayments(res.data))
      .catch(err => console.error("Erreur paiements:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💳 Paiements</h1>
      <table className="w-full border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Montant</th>
            <th>Méthode</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.user_name}</td>
              <td className="p-2">{p.amount} CFA</td>
              <td className="p-2">{p.method}</td>
              <td className="p-2">{new Date(p.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
