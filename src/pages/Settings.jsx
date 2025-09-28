import { useEffect, useState } from "react";
import api from "../services/api";

function Settings() {
  const [settings, setSettings] = useState({
    email: "",
    phone: "",
    notifications: true,
    theme: "light",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  // 🔹 Récupérer les paramètres utilisateur
  const fetchSettings = async () => {
    try {
      const res = await api.get("/settings");
      setSettings(res.data);
    } catch (err) {
      console.error("Erreur récupération settings:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Sauvegarder les paramètres
  const saveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.put("/settings", settings);
      alert("✅ Paramètres enregistrés avec succès !");
    } catch (err) {
      console.error("Erreur mise à jour settings:", err);
      alert("❌ Erreur lors de la mise à jour des paramètres.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">⚙️ Paramètres</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <form onSubmit={saveSettings} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium">Téléphone</label>
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Activer les notifications</label>
          </div>

          {/* Thème */}
          <div>
            <label className="block text-sm font-medium">Thème</label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="light">🌞 Clair</option>
              <option value="dark">🌙 Sombre</option>
            </select>
          </div>

          {/* Bouton Sauvegarder */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Sauvegarder
          </button>
        </form>
      )}
    </div>
  );
}

export default Settings;
