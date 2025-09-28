import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Bienvenue sur Digital Market Space 🚀
      </h1>
      <p className="mb-6">La marketplace où tu trouves tout, même les services freelance 💼</p>

      <h2 className="text-2xl font-semibold mb-4">Derniers produits</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="p-4 border rounded shadow bg-white">
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

export default Home;
