// src/pages/admin/Payements.jsx
// Hypothèse : backend expose GET /api/paiements for admin
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function PayementsAdmin() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get("/paiements")
      .then(res => { if (mounted) setPayments(Array.isArray(res.data) ? res.data : []); })
      .catch(err => {
        console.error("Erreur chargement paiements (admin):", err);
        toast.error("Impossible de charger les paiements.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Paiements (admin)</h1>
      {payments.length === 0 ? <div>Aucun paiement.</div> : (
        <ul className="space-y-2">
          {payments.map(p => (
            <li key={p.id} className="border p-3 rounded flex justify-between">
              <div>
                <div className="font-medium">#{p.id} — {p.userEmail || p.customer || "client"}</div>
                <div className="text-sm text-gray-500">{Number(p.amount || 0).toLocaleString()} CFA</div>
              </div>
              <div className="text-sm">{p.status || "unknown"}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
