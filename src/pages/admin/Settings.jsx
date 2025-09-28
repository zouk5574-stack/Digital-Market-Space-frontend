import { useEffect, useState } from "react";
import api from "../../services/api";

function Settings() {
  const [settings, setSettings] = useState({
    fedapayPublicKey: "",
    fedapaySecretKey: "",
    cronAutoConfirmOrders: false,
    cronAutoWithdrawals: false,
  });

  useEffect(() => {
    api.get("/admin/settings")
      .then(res => setSettings(res.data))
      .catch(err => console.error("Erreur chargement settings:", err));
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleToggle = (name) => {
    setSettings({ ...settings, [name]: !settings[name] });
  };

  const handleSave = () => {
    api.put("/admin/settings", settings)
      .then(() => alert("✅ Paramètres mis à jour !"))
      .catch(() => alert("❌ Erreur sauvegarde paramètres"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">⚙️ Paramètres Admin</h1>

      <div className="mb-4">
        <label className="block">Fedapay Public Key</label>
        <input
          type="text"
          name="fedapayPublicKey"
          value={settings.fedapayPublicKey}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block">Fedapay Secret Key</label>
        <input
          type="password"
          name="fedapaySecretKey"
          value={settings.fedapaySecretKey}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.cronAutoConfirmOrders}
          onChange={() => handleToggle("cronAutoConfirmOrders")}
        />
        <span>Activer Cron Auto-Confirmation des commandes</span>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.cronAutoWithdrawals}
          onChange={() => handleToggle("cronAutoWithdrawals")}
        />
        <span>Activer Cron Auto-Validation des retraits</span>
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sauvegarder
      </button>
    </div>
  );
}

export default Settings;
