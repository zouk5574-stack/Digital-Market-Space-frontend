// src/pages/Settings.jsx
// Hypothèse : GET /auth/me returns profile; update via PUT /settings (fallback PUT /auth/me)

import React, { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Settings() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.get("/auth/me")
      .then(res => { if (mounted && res?.data) setProfile({ name: res.data.name || "", email: res.data.email || "" }); })
      .catch(err => {
        console.error("Erreur profile:", err);
        toast.error("Impossible de charger le profil.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      // try /settings first then fallback to /auth/me
      await api.put("/settings", profile).catch(async err => {
        // fallback
        const res = await api.put("/auth/me", profile);
        return res;
      });
      toast.success("Profil mis à jour.");
    } catch (err) {
      console.error(err);
      toast.error("Erreur mise à jour profil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Profil</h1>
      <div className="max-w-md">
        <label className="block text-sm font-medium">Nom</label>
        <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full border p-2 rounded mb-3" />
        <label className="block text-sm font-medium">Email</label>
        <input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className="w-full border p-2 rounded mb-3" />
        <div className="flex gap-2">
          <button onClick={save} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Envoi..." : "Enregistrer"}</button>
        </div>
      </div>
    </div>
  );
}
