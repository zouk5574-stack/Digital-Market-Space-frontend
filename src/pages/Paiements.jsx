// src/pages/Paiements.jsx
// Hypothèses : backend expose GET /api/paiements and POST /api/paiements
// Page safe-readonly by default; sending new payment depends on backend.

import React, { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Paiements() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get("/paiements")
      .then(res => { if (mounted) setPayments(Array.isArray(res.data) ? res.data : []); })
      .catch(err => {
        console.error("Erreur paiements:", err);
        toast.error("Impossible de charger les paiements.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Paiements</h1>
      {payments.length === 0 ? (
        <div className="text-sm text-gray-500">Aucun paiement enregistré.</div>
      ) : (
        <ul className="space-y-2">
          {payments.map(pay => (
            <li key={pay.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-medium">#{pay.id} — {pay.method || pay.type || "Paiement"}</div>
                <div className="text-sm text-gray-500">{Number(pay.amount || 0).toLocaleString()} CFA</div>
              </div>
              <div className="text-sm text-gray-600">{pay.status || "unknown"}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
