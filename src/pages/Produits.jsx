import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Erreur fetch produits:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      if (file) formData.append("image", file);

      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setName("");
      setPrice("");
      setDescription("");
      setFile(null);
      fetchProducts();
    } catch (err) {
      console.error("Erreur ajout produit:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Produits 📦</h1>

      {/* Formulaire ajout produit */}
      <form
        onSubmit={handleAddProduct}
        className="space-y-4 border p-4 rounded mb-6"
      >
        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border w-full p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </form>

      {/* Liste produits */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="p-4 border rounded shadow bg-white">
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-gray-600">{p.description}</p>
              <p className="text-blue-500 font-bold">{p.price} CFA</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
