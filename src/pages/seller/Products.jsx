import { useEffect, useState } from "react";
import api from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/mine")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Erreur produits vendeur:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Mes Produits</h1>
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        + Ajouter un produit
      </button>
      <table className="w-full border shadow bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.price} CFA</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2">
                <button className="px-2 py-1 bg-yellow-500 text-white rounded">Modifier</button>
                <button className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
