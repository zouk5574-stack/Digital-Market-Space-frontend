import { useEffect, useState } from "react";
import api from "../../services/api";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Erreur users:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Tous les utilisateurs</h1>
      <table className="w-full border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.active ? "✅ Actif" : "❌ Bloqué"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
