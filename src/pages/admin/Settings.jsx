// src/pages/admin/Settings.jsx

import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "",
    supportEmail: "",
    commissionRate: "",
    fedapayPublicKey: "",
    fedapaySecretKey: "",
    logoUrl: "",
    faviconUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Charger les réglages actuels
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/admin/settings");
        if (res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        setMessage("⚠️ Impossible de charger les paramètres.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Upload image
  const handleUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.url) {
        setSettings({ ...settings, [field]: res.data.url });
      }
    } catch (err) {
      setMessage("❌ Erreur lors de l'upload de l'image.");
    }
  };

  // Sauvegarder modifications
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await api.put("/admin/settings", settings);
      setMessage("✅ Paramètres mis à jour avec succès !");
    } catch (err) {
      setMessage("❌ Erreur lors de la sauvegarde des paramètres.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Chargement des paramètres...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Réglages administrateur</h1>

      {message && <div className="mb-4 text-sm">{message}</div>}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Infos générales */}
        <div>
          <label className="block text-sm font-medium">Nom du site</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) =>
              setSettings({ ...settings, siteName: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email support</label>
          <input
            type="email"
            value={settings.supportEmail}
            onChange={(e) =>
              setSettings({ ...settings, supportEmail: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Commission vendeur (%)
          </label>
          <input
            type="number"
            value={settings.commissionRate}
            onChange={(e) =>
              setSettings({ ...settings, commissionRate: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
        </div>

        <hr />

        {/* Clés API Fedapay */}
        <h2 className="text-lg font-semibold">Clés API Fedapay</h2>

        <div>
          <label className="block text-sm font-medium">Clé publique</label>
          <input
            type="text"
            value={settings.fedapayPublicKey}
            onChange={(e) =>
              setSettings({ ...settings, fedapayPublicKey: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Clé secrète</label>
          <input
            type="password"
            value={settings.fedapaySecretKey}
            onChange={(e) =>
              setSettings({ ...settings, fedapaySecretKey: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <hr />

        {/* Uploads */}
        <h2 className="text-lg font-semibold">Identité visuelle</h2>

        <div>
          <label className="block text-sm font-medium">Logo du site</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, "logoUrl")}
            className="block w-full text-sm"
          />
// src/pages/admin/Settings.jsx

import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "",
    supportEmail: "",
    commissionRate: "",
    fedapayPublicKey: "",
    fedapaySecretKey: "",
    logoUrl: "",
    faviconUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showSecret, setShowSecret] = useState(false); // 👁️ toggle clé secrète

  // Charger les réglages actuels
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/admin/settings");
        if (res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        setMessage("⚠️ Impossible de charger les paramètres.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Upload image
  const handleUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.url) {
        setSettings({ ...settings, [field]: res.data.url });
      }
    } catch (err) {
      setMessage("❌ Erreur lors de l'upload de l'image.");
    }
  };

  // Sauvegarder modifications
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    // ✅ Validation commission
    if (settings.commissionRate < 0 || settings.commissionRate > 100) {
      setMessage("⚠️ La commission doit être entre 0 et 100%");
      setSaving(false);
      return;
    }

    try {
      await api.put("/admin/settings", settings);
      setMessage("✅ Paramètres mis à jour avec succès !");
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "❌ Erreur lors de la sauvegarde des paramètres."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Chargement des paramètres...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Réglages administrateur</h1>

      {message && (
        <div
          className={`mb-4 text-sm ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Infos générales */}
        <div>
          <label className="block text-sm font-medium">Nom du site</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) =>
              setSettings({ ...settings, siteName: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email support</label>
          <input
            type="email"
            value={settings.supportEmail}
            onChange={(e) =>
              setSettings({ ...settings, supportEmail: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Commission vendeur (%)
          </label>
          <input
            type="number"
            value={settings.commissionRate}
            onChange={(e) =>
              setSettings({ ...settings, commissionRate: e.target.value })
            }
            className="w-full border rounded p-2"
            min="0"
            max="100"
            required
          />
        </div>

        <hr />

        {/* Clés API Fedapay */}
        <h2 className="text-lg font-semibold">Clés API Fedapay</h2>

        <div>
          <label className="block text-sm font-medium">Clé publique</label>
          <input
            type="text"
            value={settings.fedapayPublicKey}
            onChange={(e) =>
              setSettings({ ...settings, fedapayPublicKey: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Clé secrète</label>
          <div className="flex items-center">
            <input
              type={showSecret ? "text" : "password"}
              value={settings.fedapaySecretKey}
              onChange={(e) =>
                setSettings({ ...settings, fedapaySecretKey: e.target.value })
              }
              className="w-full border rounded p-2"
            />
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="ml-2 px-3 py-1 border rounded text-sm"
            >
              {showSecret ? "Masquer" : "Afficher"}
            </button>
          </div>
        </div>

        <hr />

        {/* Uploads */}
        <h2 className="text-lg font-semibold">Identité visuelle</h2>

        <div>
          <label className="block text-sm font-medium">Logo du site</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, "logoUrl")}
            className="block w-full text-sm"
          />
          {settings.logoUrl && (
            <img
              src={settings.logoUrl}
              alt="Logo"
              className="mt-2 h-16 object-contain"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Favicon</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, "faviconUrl")}
            className="block w-full text-sm"
          />
          {settings.faviconUrl && (
            <img
              src={settings.faviconUrl}
              alt="Favicon"
              className="mt-2 h-10 object-contain"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {saving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </form>
    </div>
  );
      }
