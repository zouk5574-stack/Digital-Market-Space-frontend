// src/pages/buyer/Cart.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(saved);
    } catch {
      setCart([]);
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleQtyChange = (id, qty) => {
    const newCart = cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, qty) } : item
    );
    updateCart(newCart);
  };

  const handleRemove = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Mon panier</h1>
      {cart.length === 0 ? (
        <div>Votre panier est vide.</div>
      ) : (
        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center border p-3 rounded">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">{Number(item.price).toLocaleString()} CFA</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={e => handleQtyChange(item.id, Number(e.target.value))}
                  className="w-16 border rounded px-2 py-1"
                />
                <button onClick={() => handleRemove(item.id)} className="text-red-600">Supprimer</button>
              </div>
            </div>
          ))}

          <div className="font-bold">Total: {total.toLocaleString()} CFA</div>

          <button
            onClick={() => navigate("/buyer/checkout")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Passer au paiement
          </button>
        </div>
      )}
    </div>
  );
}
