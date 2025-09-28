// src/pages/Produits.jsx
// Hypothèses : backend expose GET /api/produits
// Si /produits n'existe pas, la page affichera erreur friendly.

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
      .then(res => { if (mounted) setProduits(Array.isArray(res.data) ? res.data : []); })
      .catch(err => {
        console.error("Erreur chargement produits:", err);
        toast.error("Impossible de charger les produits.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Produits</h1>
      {produits.length === 0 ? (
        <div className="text-sm text-gray-500">Aucun produit pour le moment.</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {produits.map(p => (
            <li key={p.id} className="border rounded p-4 bg-white">
              <div className="font-medium text-lg">{p.name || p.title}</div>
              <div className="text-sm text-gray-500">{p.description ? p.description.slice(0, 120) : ""}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-bold">{Number(p.price || 0).toLocaleString()} CFA</div>
                <div>
                  <button
                    onClick={() => navigate(`/produit/${p.id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >Voir</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
