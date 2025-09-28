import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get("/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleBan = async (id, banned) => {
    try {
      await api.put(`/admin/users/${id}`, { banned: !banned });
      setUsers(users.map(u => u.id === id ? { ...u, banned: !banned } : u));
      toast.success("Mise à jour status");
    } catch (err) {
      toast.error("Erreur");
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Utilisateurs</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-100">
            <tr><th>ID</th><th>Nom</th><th>Email</th><th>Rôle</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.first_name} {u.last_name}</td>
                <td className="p-2">{u.email || u.phone}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <button onClick={()=>toggleBan(u.id, u.banned)} className="px-3 py-1 bg-red-500 text-white rounded">{u.banned ? "Débloquer" : "Bannir"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
