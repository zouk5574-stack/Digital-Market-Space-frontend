// src/pages/seller/Products.jsx
// Hypothèse : backend exposes GET /api/produits and DELETE /api/produits/:id

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api.get("/produits")
      .then(res => { if (mounted) setProducts(Array.isArray(res.data) ? res.data : []); })
      .catch(err => { console.error(err); toast.error("Impossible de charger les produits."); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const removeProduct = async (id) => {
    if (!confirm("Supprimer ce produit ?")) return;
    setDeleting(prev => ({ ...prev, [id]: true }));
    try {
      await api.delete(`/produits/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Produit supprimé.");
    } catch (err) {
      console.error(err);
      toast.error("Impossible de supprimer le produit.");
    } finally {
      setDeleting(prev => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Mes produits</h1>
        <button onClick={() => navigate("/seller/products/new")} className="px-3 py-1 bg-blue-600 text-white rounded">Ajouter</button>
      </div>

      {products.length === 0 ? <div>Aucun produit.</div> : (
        <ul className="space-y-3">
          {products.map(p => (
            <li key={p.id} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-medium">{p.name || p.title}</div>
                <div className="text-sm text-gray-500">{Number(p.price || 0).toLocaleString()} CFA</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate(`/seller/products/${p.id}/edit`)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button disabled={deleting[p.id]} onClick={() => removeProduct(p.id)} className="px-2 py-1 bg-red-600 text-white rounded">Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
                }
