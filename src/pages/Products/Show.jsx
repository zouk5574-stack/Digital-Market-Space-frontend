// src/pages/products/Show.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function ProductShow() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.get(`/produits/${id}`)
      .then(res => {
        if (mounted) setProduct(res.data);
      })
      .catch(err => {
        console.error(err);
        toast.error("Impossible de charger le produit.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  const handleBuy = async () => {
    try {
      toast.loading("Redirection vers le paiement...");
      // Hypothèse : backend crée la transaction
      const res = await api.post(`/paiements/initier`, { productId: id });
      if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        toast.error("Lien de paiement non disponible.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du démarrage du paiement.");
    } finally {
      toast.dismiss();
    }
  };

  const handleDownload = async (fileId) => {
    setDownloading(true);
    try {
      const res = await api.get(`/produits/${id}/fichiers/${fileId}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "fichier");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du téléchargement.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!product) return <div className="p-6">Produit introuvable.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-medium mb-4">
        {Number(product.price).toLocaleString()} CFA
      </p>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleBuy}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Acheter maintenant
        </button>
      </div>

      {product.files && product.files.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Fichiers disponibles</h2>
          <ul className="space-y-2">
            {product.files.map((f) => (
              <li key={f.id} className="flex justify-between items-center p-2 border rounded">
                <span>{f.name}</span>
                <button
                  onClick={() => handleDownload(f.id)}
                  disabled={downloading}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  {downloading ? "Téléchargement..." : "Télécharger"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
