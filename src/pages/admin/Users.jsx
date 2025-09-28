// src/pages/admin/Users.jsx
// Hypothèse : backend peut exposer /admin/users or /auth/users or /users
// We try them in order, show first successful response.

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const tries = ["/admin/users", "/auth/users", "/users"];
    (async () => {
      for (const ep of tries) {
        try {
          const res = await api.get(ep);
          if (!mounted) return;
          if (Array.isArray(res.data)) {
            setUsers(res.data);
            break;
          }
        } catch (e) {
          // try next
        }
      }
      if (mounted) setLoading(false);
    })();

    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Utilisateurs (admin)</h1>
      {users.length === 0 ? <div>Aucun utilisateur trouvé.</div> : (
        <ul className="space-y-2">
          {users.map(u => (
            <li key={u.id} className="border p-3 rounded flex justify-between">
              <div>
                <div className="font-medium">{u.name || u.email}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </div>
              <div className="text-sm">{u.role || "user"}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
