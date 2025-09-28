import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await axios.post(`${API_URL}${endpoint}`, form);
      setMessage(res.data.message || "✅ Succès !");
      if (isLogin && res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Erreur serveur");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Connexion" : "Inscription"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          {isLogin ? "Se connecter" : "Créer un compte"}
        </button>
      </form>

      <p className="text-center mt-4">
        {isLogin ? "Pas encore inscrit ?" : "Déjà un compte ?"}{" "}
        <button
          className="text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Créer un compte" : "Se connecter"}
        </button>
      </p>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
