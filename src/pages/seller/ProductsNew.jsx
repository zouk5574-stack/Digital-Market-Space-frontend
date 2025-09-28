// src/pages/seller/ProductsNew.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function ProductsNew() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    files: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiles = (e) => {
    setForm((prev) => ({ ...prev, files: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      toast.error("Titre et prix sont obligatoires.");
      return;
    }

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

      await api.post("/produits", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Produit ajouté avec succès 🎉");
      navigate("/seller/products");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l’ajout du produit.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Ajouter un produit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Titre *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Nom du produit"
          />
        </div>

        <div>
          <label className="block mb-1">Prix (CFA) *</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="10000"
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
            placeholder="Ex: Graphisme, E-book..."
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
            placeholder="Décrivez votre produit..."
          />
        </div>

        <div>
          <label className="block mb-1">Fichiers (images, PDF, vidéos...)</label>
          <input
            type="file"
            multiple
            onChange={handleFiles}
            className="w-full"
          />
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
            {submitting ? "Envoi..." : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}
