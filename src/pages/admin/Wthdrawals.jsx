// src/pages/admin/Wthdrawals.jsx
// Hypothèse : backend expose GET /api/withdrawals and PUT /api/withdrawals/:id/status

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AdminWithdrawals() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({}); // id -> bool

  useEffect(() => {
    let mounted = true;
    api.get("/withdrawals")
      .then(res => { if (mounted) setList(Array.isArray(res.data) ? res.data : []); })
      .catch(err => { console.error(err); toast.error("Impossible de charger les retraits."); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const updateStatus = async (id, status) => {
    setProcessing(prev => ({ ...prev, [id]: true }));
    try {
      await api.put(`/withdrawals/${id}/status`, { status });
      setList(prev => prev.map(w => w.id === id ? { ...w, status } : w));
      toast.success("Statut mis à jour.");
    } catch (err) {
      console.error(err);
      toast.error("Impossible de mettre à jour le statut.");
    } finally {
      setProcessing(prev => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Retraits (admin)</h1>
      {list.length === 0 ? <div>Aucun retrait.</div> : (
        <ul className="space-y-2">
          {list.map(w => (
            <li key={w.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{w.user_email || `User ${w.user_id}`}</div>
                <div className="text-sm text-gray-500">{Number(w.amount || 0).toLocaleString()} CFA</div>
                <div className="text-sm text-gray-400">{w.createdAt}</div>
              </div>
              <div className="flex gap-2">
                <div className={`px-3 py-1 rounded ${w.status === "approved" ? "bg-green-100" : w.status === "pending" ? "bg-yellow-100" : "bg-red-100"}`}>
                  {w.status}
                </div>
                <button disabled={processing[w.id]} onClick={() => updateStatus(w.id, "approved")} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                <button disabled={processing[w.id]} onClick={() => updateStatus(w.id, "rejected")} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
