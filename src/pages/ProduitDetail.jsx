// src/pages/ProduitDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function ProduitDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`)
      .then(res => setProduit(res.data))
      .catch(err => {
        console.error("Erreur produit:", err);
        toast.error("Impossible de charger ce produit.");
      })
      .finally(() => setLoading(false));

    // Vérifier si l’utilisateur a déjà acheté ce produit
    api.get("/orders/my-orders")
      .then(res => {
        if (Array.isArray(res.data)) {
          const alreadyBought = res.data.some(o => o.product && o.product.id === Number(id));
          setIsPurchased(alreadyBought);
        }
      })
      .catch(err => console.warn("Impossible de vérifier l'achat:", err));
  }, [id]);

  const handlePurchase = async () => {
    try {
      // 1. Initier le paiement
      const paymentRes = await api.post("/payments", { productId: id });
      toast.success("Paiement initié ✅");

      // 👉 Si ton backend renvoie une URL de paiement (ex: Stripe, PayPal, CinetPay)
      if (paymentRes.data?.redirectUrl) {
        window.location.href = paymentRes.data.redirectUrl;
        return;
      }

      // 2. Créer la commande directement (si paiement géré en interne ou déjà validé)
      await api.post("/orders", { productId: id });
      toast.success("Commande créée ✅");
      setIsPurchased(true);
    } catch (err) {
      console.error("Erreur paiement:", err);
      toast.error("Échec du paiement ❌");
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!produit) return <div className="p-6">Produit introuvable.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      {/* Image */}
      <img
        src={produit.image || "/placeholder.png"}
        alt={produit.name}
        className="w-full h-64 object-cover rounded"
      />

      {/* Infos principales */}
      <h1 className="text-2xl font-bold mt-4">{produit.name}</h1>
      <p className="text-lg font-semibold text-teal-600">
        {Number(produit.price).toLocaleString()} CFA
      </p>

      {!isPurchased ? (
        <>
          {/* Aperçu limité */}
          <p className="mt-3 text-gray-600 line-clamp-3">
            {produit.description || "Aperçu indisponible"}
          </p>

          <div className="mt-4 p-3 bg-yellow-50 border rounded text-yellow-800">
            🔒 Contenu complet réservé aux acheteurs.
          </div>

          <button
            onClick={handlePurchase}
            className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Acheter
          </button>
        </>
      ) : (
        <>
          {/* Contenu complet débloqué */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Détails complets</h2>
            <p className="mt-2 text-gray-700">{produit.description}</p>

            {produit.type === "digital" && produit.fileUrl && (
              <a
                href={produit.fileUrl}
                download
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                📥 Télécharger le fichier
              </a>
            )}

            {produit.type === "freelance" && (
              <div className="mt-4 p-4 bg-gray-50 border rounded">
                <p><strong>Compétences :</strong> {produit.skills}</p>
                <p><strong>Délai :</strong> {produit.deliveryTime || "Non précisé"}</p>
                <p><strong>Contact :</strong> {produit.contact || "Via plateforme"}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
                        }
