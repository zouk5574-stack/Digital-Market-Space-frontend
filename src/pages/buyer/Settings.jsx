import { useEffect, useState } from "react";
import api from "../../services/api";

function BuyerSettings() {
  const [profile, setProfile] = useState({ name: "", email: "" });

  useEffect(() => {
    api.get("/buyer/profile")
      .then(res => setProfile(res.data))
      .catch(err => console.error("Erreur profil acheteur:", err));
  }, []);

  const updateProfile = () => {
    api.put("/buyer/profile", profile)
      .then(() => alert("✅ Profil mis à jour"))
      .catch(() => alert("❌ Erreur mise à jour profil"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⚙️ Paramètres</h1>

      <div className="space-y-4">
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Nom"
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          placeholder="Email"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={updateProfile}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Mettre à jour
        </button>
      </div>
    </div>
  );
}

export default BuyerSettings;
