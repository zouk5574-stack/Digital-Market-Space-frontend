// src/pages/buyer/Messages.jsx
// Hypothèse : backend supports GET /api/messages/:orderId or GET /api/messages
// Sending: POST /api/messages (best-effort)

import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BuyerMessages() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const orderId = query.get("orderId");

  useEffect(() => {
    let mounted = true;
    const fetchMessages = async () => {
      try {
        if (orderId) {
          const res = await api.get(`/messages/${orderId}`);
          if (mounted) setMessages(Array.isArray(res.data) ? res.data : []);
        } else {
          const res = await api.get("/messages").catch(() => ({ data: [] }));
          if (mounted) setMessages(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        console.error("Erreur messages:", err);
        toast.error("Impossible de charger les messages.");
      } finally {
        mounted && setLoading(false);
      }
    };
    fetchMessages();
    return () => { mounted = false; };
  }, [orderId]);

  const sendMessage = async () => {
    if (!text.trim()) return toast.error("Message vide.");
    try {
      const payload = orderId ? { orderId, text } : { text };
      const res = await api.post("/messages", payload);
      setMessages(prev => [...prev, res.data || payload]);
      setText("");
    } catch (err) {
      console.error(err);
      toast.error("Impossible d'envoyer le message.");
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Messages</h1>

      <div className="mb-4">
        <textarea value={text} onChange={e => setText(e.target.value)} className="w-full border p-2 rounded" placeholder="Écrire un message..." />
        <div className="mt-2 flex justify-end">
          <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded">Envoyer</button>
        </div>
      </div>

      {messages.length === 0 ? <div>Aucun message.</div> : (
        <ul className="space-y-2">
          {messages.map((m, i) => (
            <li key={m.id || i} className="p-3 border rounded">
              <div className="text-sm text-gray-600">{m.senderName || m.from || "Utilisateur"}</div>
              <div className="mt-1">{m.text || m.message}</div>
              <div className="text-xs text-gray-400 mt-1">{new Date(m.createdAt || m.date || Date.now()).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
