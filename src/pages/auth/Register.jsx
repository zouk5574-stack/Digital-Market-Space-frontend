import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ first_name: "", last_name: "", phone: "", email: "", password: "", role: "buyer" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(payload);
      toast.success("Inscription réussie — connectez-vous");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || err.message || "Erreur inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-bold text-primary mb-4">Créer un compte</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Prénom" value={payload.first_name} onChange={e=>setPayload({...payload, first_name:e.target.value})} className="border p-2 rounded w-full" />
        <input placeholder="Nom" value={payload.last_name} onChange={e=>setPayload({...payload, last_name:e.target.value})} className="border p-2 rounded w-full" />
        <input placeholder="Téléphone" value={payload.phone} onChange={e=>setPayload({...payload, phone:e.target.value})} className="border p-2 rounded w-full" />
        <input placeholder="Email (optionnel)" value={payload.email} onChange={e=>setPayload({...payload, email:e.target.value})} className="border p-2 rounded w-full" />
        <input type="password" placeholder="Mot de passe" value={payload.password} onChange={e=>setPayload({...payload, password:e.target.value})} className="border p-2 rounded w-full" />
        <div className="flex gap-2 items-center">
          <label className="text-sm">S'inscrire en tant que :</label>
          <select value={payload.role} onChange={e=>setPayload({...payload, role:e.target.value})} className="border p-2 rounded">
            <option value="buyer">Acheteur</option>
            <option value="seller">Vendeur</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Chargement..." : "S'inscrire"}</button>
      </form>
    </div>
  );
}
