import { useState } from "react";
import api from "../services/api";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("✅ Authentification réussie !");
      }
    } catch (err) {
      console.error("Erreur auth:", err);
      alert("❌ Erreur d’authentification");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? "Connexion" : "Inscription"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {isLogin ? "Se connecter" : "S’inscrire"}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 underline"
      >
        {isLogin ? "Pas de compte ? S’inscrire" : "Déjà un compte ? Se connecter"}
      </button>
    </div>
  );
}

export default Auth;
