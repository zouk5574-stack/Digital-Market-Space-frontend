import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Settings() {
  const [settings, setSettings] = useState({ fedapay_key: "", auto_confirm_delay_hours: 48, commission_rate: 10 });

  useEffect(() => {
    api.get("/settings") // backend path may be /api/settings -> api.js already adds /api
      .then(res => {
        setSettings(prev => ({ ...prev, ...res.data }));
      })
      .catch(err => console.error(err));
  }, []);

  const save = () => {
    api.put("/settings", settings)
      .then(() => toast.success("Paramètres mis à jour"))
      .catch(() => toast.error("Erreur sauvegarde"));
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-primary mb-4">Paramètres</h2>

      <div className="mb-3">
        <label className="block text-sm">Clé Fedapay</label>
        <input value={settings.fedapay_key || ""} onChange={e=>setSettings({...settings, fedapay_key: e.target.value})} className="border p-2 rounded w-full" />
      </div>

      <div className="mb-3">
        <label className="block text-sm">Délai auto-confirmation (heures)</label>
        <input type="number" value={settings.auto_confirm_delay_hours} onChange={e=>setSettings({...settings, auto_confirm_delay_hours: Number(e.target.value)})} className="border p-2 rounded w-1/3" />
      </div>

      <div className="mb-3">
        <label className="block text-sm">Taux commission (%)</label>
        <input type="number" value={settings.commission_rate} onChange={e=>setSettings({...settings, commission_rate: Number(e.target.value)})} className="border p-2 rounded w-1/3" />
      </div>

      <button onClick={save} className="btn-primary">Sauvegarder</button>
    </div>
  );
}
