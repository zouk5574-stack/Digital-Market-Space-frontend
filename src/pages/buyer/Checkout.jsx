// src/pages/buyer/Checkout.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(saved);
    } catch {
      setCart([]);
    }
  }, []);

  const total = cart.reduce((sum, p) => sum + Number(p.price) * Number(p.qty), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Votre panier est vide.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        items: cart.map(p => ({
          productId: p.id,
          qty: p.qty,
        })),
      };
      const res = await api.post("/orders", payload);
      if (res?.data) {
        toast.success("Commande créée avec succès !");
        localStorage.removeItem("cart");
        navigate("/buyer/orders");
      }
    } catch (err) {
      console.error("Erreur checkout:", err);
      const msg = err?.response?.data?.message || "Erreur lors de la commande.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Paiement</h1>
      {cart.length === 0 ? (
        <div>Votre panier est vide.</div>
      ) : (
        <div>
          <ul className="mb-4 space-y-2">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span>{item.name} × {item.qty}</span>
                <span>{(item.price * item.qty).toLocaleString()} CFA</span>
              </li>
            ))}
          </ul>
          <div className="font-bold mb-4">Total: {total.toLocaleString()} CFA</div>
          <button
            onClick={handleCheckout}
            disabled={submitting}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {submitting ? "Validation..." : "Confirmer la commande"}
          </button>
        </div>
      )}
    </div>
  );
}
