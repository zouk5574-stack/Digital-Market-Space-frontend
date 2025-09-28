import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-primary">{p.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{p.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <strong className="text-accent">{p.price} FCFA</strong>
        <Link to={`/product/${p.id}`} className="btn-primary text-sm">Voir</Link>
      </div>
    </div>
  );
}
