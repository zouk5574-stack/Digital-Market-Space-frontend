import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  useEffect(()=> {
    api.get("/seller/products")
      .then(res=> setProducts(res.data))
      .catch(()=>{});
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-4">Mes produits</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map(p => <div key={p.id} className="card"><div>{p.name}</div><div className="text-accent">{p.price} CFA</div></div>)}
      </div>
    </div>
  );
}
