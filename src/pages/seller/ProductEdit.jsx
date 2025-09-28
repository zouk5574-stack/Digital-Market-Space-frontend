// src/pages/seller/ProductsEdit.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function ProductsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    files: [],
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.get(`/produits/${id}`)
      .then(res => {
        if (!mounted) return;
        if (res.data) {
          setForm({
            title: res.data.title || "",
            price: res.data.price || "",
            description: res.data.description || "",
            category: res.data.category || "",
            files: [],
          });
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Impossible de charger le produit.");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFiles = (e) => {
    setForm(prev => ({ ...prev, files: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("price", form.price);
      data.append("description", form.description);
      data.append("category", form.category);
      if (form.files?.length > 0) {
        for (let i = 0; i < form.files.length; i++) {
          data.append("files", form.files[i]);
        }
      }

      await api.put(`/produits/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Produit mis à jour 🎉");
      navigate("/seller/products");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Modifier le produit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Titre</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Prix (CFA)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Catégorie</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="4"
          />
        </div>

        <div>
          <label className="block mb-1">Nouveaux fichiers (optionnel)</label>
          <input type="file" multiple onChange={handleFiles} />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/seller/products")}
            className="px-4 py-2 border rounded"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {submitting ? "Mise à jour..." : "Sauvegarder"}
          </button>
        </div>
      </form>
    </div>
  );
}
