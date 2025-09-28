import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div>Chargement...</div>;

  return (
    <div className="card">
      <h1 className="text-2xl font-bold text-primary">{product.name}</h1>
      <p className="text-gray-700">{product.description}</p>
      <div className="mt-4 flex gap-4">
        <div className="text-accent font-bold">{product.price} FCFA</div>
        <button className="btn-accent">Acheter</button>
      </div>
    </div>
  );
}
