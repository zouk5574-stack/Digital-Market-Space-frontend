import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si un utilisateur est stocké après connexion
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erreur parsing user:", e);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-700 overflow-hidden">
      {/* Logo filigrane */}
      <img
        src="/logo.png"
        alt="Digital Market Space Background Logo"
        className="absolute inset-0 w-[80%] max-w-4xl mx-auto opacity-10 pointer-events-none select-none"
      />

      {/* Carte centrale */}
      <div className="relative bg-white text-gray-900 rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center z-10">
        <h1 className="text-4xl font-extrabold text-teal-600 mb-4">
          🚀 Bienvenue sur Digital Market Space
        </h1>
        <p className="text-lg text-gray-600 italic mb-8">
          Votre satisfaction est notre priorité ✨
        </p>

        {/* Boutons CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="btn bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700 transition"
          >
            Voir les produits
          </Link>
          <Link
            to="/auth"
            className="btn border border-teal-600 text-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50 transition"
          >
            Se connecter
          </Link>
          <Link
            to="/seller/dashboard"
            className="btn bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition"
          >
            Devenir vendeur
          </Link>

          {/* ✅ Bouton Admin visible seulement pour les admins */}
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="btn bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              Espace Admin
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
