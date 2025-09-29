// src/pages/MesCommandes.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/orders/my-orders")
      .then(res => {
        if (Array.isArray(res.data)) setCommandes(res.data);
        else setCommandes([]);
      })
      .catch(err => {
        console.error("Erreur chargement commandes:", err);
        toast.error("Impossible de charger vos achats.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🛒 Mes Achats</h1>

      {commandes.length === 0 ? (
        <div className="text-gray-500">Vous n’avez encore rien acheté.</div>
      ) : (
        <ul className="space-y-4">
          {commandes.map((commande) => {
            const produit = commande.product || {};
            return (
              <li
                key={commande.id}
                className="p-4 bg-white border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between"
              >
                {/* Infos produit */}
                <div>
                  <h2 className="text-lg font-semibold">{produit.name}</h2>
                  <p className="text-gray-600">{produit.description?.slice(0, 100)}...</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Prix : {Number(produit.price).toLocaleString()} CFA
                  </p>
                  <p className="text-xs text-gray-400">
                    Commande #{commande.id} – {new Date(commande.created_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                  {produit.type === "digital" && produit.fileUrl ? (
                    <a
                      href={produit.fileUrl}
                      download
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      📥 Télécharger
                    </a>
                  ) : produit.type === "freelance" ? (
                    <div className="text-sm text-gray-700">
                      Service freelance réservé ✅  
                      <br />
                      <span className="text-gray-500">
                        Contact : {produit.contact || "Via plateforme"}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500">Pas d’action disponible</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
