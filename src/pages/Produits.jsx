import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-primary">Produits</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  );
}
