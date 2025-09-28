import { useEffect, useState } from "react";
import api from "../../services/api";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

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
      .catch(() => toast.error("Erreur lors du chargement des paramètres"));
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleToggle = (name) => {
    setSettings({ ...settings, [name]: !settings[name] });
  };

  const handleSave = () => {
    api.put("/admin/settings", settings)
      .then(() => toast.success("✅ Paramètres mis à jour !"))
      .catch(() => toast.error("❌ Erreur sauvegarde paramètres"));
  };

  return (
    <div className="p-6 grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>🔑 Clés Fedapay</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <input
            type="text"
            name="fedapayPublicKey"
            placeholder="Fedapay Public Key"
            value={settings.fedapayPublicKey}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            name="fedapaySecretKey"
            placeholder="Fedapay Secret Key"
            value={settings.fedapaySecretKey}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>⚙️ Automatisations (CRON)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>Auto-Confirmation des commandes</span>
            <Switch
              checked={settings.cronAutoConfirmOrders}
              onCheckedChange={() => handleToggle("cronAutoConfirmOrders")}
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Auto-Validation des retraits</span>
            <Switch
              checked={settings.cronAutoWithdrawals}
              onCheckedChange={() => handleToggle("cronAutoWithdrawals")}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
        Sauvegarder
      </Button>
    </div>
  );
}

export default Settings;
