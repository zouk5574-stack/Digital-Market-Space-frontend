import React, { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Produits() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("/produits")
      .then(res => {
        if (mounted) setProduits(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Erreur chargement produits:", err);
        toast.error("Impossible de charger les produits.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Chargement des produits...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛍️ Produits & Services Digitaux
      </h1>

      {produits.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Aucun produit ni service disponible pour le moment.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produits.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
            >
              {/* Image ou placeholder */}
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name || p.title}
                className="w-full h-48 object-cover"
              />

              {/* Contenu */}
              <div className="p-5 flex flex-col justify-between h-60">
                {/* Titre */}
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {p.name || p.title}
                </h2>

                {/* Description courte */}
                <p className="text-sm text-gray-600 line-clamp-3">
                  {p.description || "Pas de description fournie"}
                </p>

                {/* Cas spécial freelance */}
                {p.type === "freelance" && (
                  <div className="mt-2 text-sm text-teal-700 bg-teal-50 px-2 py-1 rounded">
                    💼 Offre Freelance : {p.skills || "Compétences non précisées"}
                  </div>
                )}

                {/* Infos basiques */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-teal-600">
                    {Number(p.price || 0).toLocaleString()} CFA
                  </span>
                  <button
                    onClick={() => navigate(`/produit/${p.id}`)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                  >
                    Voir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
