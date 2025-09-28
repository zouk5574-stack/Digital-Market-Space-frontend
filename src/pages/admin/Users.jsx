import { useEffect, useState } from "react";
import api from "../../services/api";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Erreur chargement users:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Gestion des utilisateurs</h1>
      <table className="w-full border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rôle</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                <button className="px-2 py-1 bg-red-500 text-white rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
