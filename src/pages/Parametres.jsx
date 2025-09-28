import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Parametres() {
  const [settings, setSettings] = useState({ theme: "light", language: "fr" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/settings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSettings(res.data || {});
      } catch (err) {
        console.error("Erreur chargement settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const saveSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_URL}/settings`,
        settings,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Paramètres mis à jour !");
    } catch (err) {
      setMessage("❌ Erreur mise à jour");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Paramètres</h2>

      <label className="block mb-2">Thème</label>
      <select
        name="theme"
        value={settings.theme}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="light">Clair</option>
        <option value="dark">Sombre</option>
      </select>

      <label className="block mb-2">Langue</label>
      <select
        name="language"
        value={settings.language}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>

      <button
        onClick={saveSettings}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Sauvegarder
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
