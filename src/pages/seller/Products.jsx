import { useEffect, useState } from "react";
import api from "../../services/api";

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0 });

  useEffect(() => {
    api.get("/seller/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Erreur chargement produits:", err));
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    api.post("/seller/products", newProduct)
      .then(res => {
        setProducts([...products, res.data]);
        setNewProduct({ name: "", price: 0 });
      })
      .catch(() => alert("❌ Erreur ajout produit"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Mes Produits</h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Nom du produit"
          className="border p-2 rounded w-1/2"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Prix"
          className="border p-2 rounded w-1/4"
        />
        <button onClick={addProduct} className="px-4 py-2 bg-green-600 text-white rounded">
          Ajouter
        </button>
      </div>

      <table className="w-full border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.price} CFA</td>
              <td className="p-2">{new Date(p.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerProducts;
