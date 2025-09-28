import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../../services/auth";
import { useAuth } from "../../utils/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, fetchMe } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login({ identifier, password });
      const token = data.token || data.accessToken || data.jwt;
      if (!token) throw new Error("Token not returned");

      if (remember) localStorage.setItem("dms_token", token);
      else sessionStorage.setItem("dms_token", token);

      await fetchMe();
      toast.success("Connexion réussie");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || err.message || "Erreur connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-bold text-primary mb-4">Connexion</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600">Email ou téléphone</label>
          <input value={identifier} onChange={e=>setIdentifier(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Mot de passe</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Se souvenir</label>
          <a href="/forgot-password" className="text-sm text-primary">Mot de passe oublié ?</a>
        </div>
        <div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Connexion..." : "Se connecter"}</button>
        </div>
      </form>
    </div>
  );
}
