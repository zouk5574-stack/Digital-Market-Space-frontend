import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas !");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("✅ Compte créé avec succès !");
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard"); // redirection après inscription
    } catch (err) {
      console.error("Erreur register:", err);
      alert("❌ Erreur lors de l'inscription !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">📝 Inscription</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1"
              placeholder="Entrez votre nom"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1"
              placeholder="Entrez votre email"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1"
              placeholder="********"
            />
          </div>

          {/* Confirmation mot de passe */}
          <div>
            <label className="block text-sm font-medium">
              Confirmer mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1"
              placeholder="********"
            />
          </div>

          {/* Bouton inscription */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Création..." : "S'inscrire"}
          </button>
        </form>

        {/* Lien vers connexion */}
        <p className="text-sm text-center mt-4">
          Déjà un compte ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Connectez-vous
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
