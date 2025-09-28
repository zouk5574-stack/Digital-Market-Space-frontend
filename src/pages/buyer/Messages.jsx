import { useEffect, useState } from "react";
import api from "../../services/api";

function BuyerMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get("/buyer/messages")
      .then(res => setMessages(res.data))
      .catch(err => console.error("Erreur messages acheteur:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">✉️ Mes Messages</h1>
      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className="p-4 border rounded shadow bg-white">
            <p><strong>{m.sender}</strong> : {m.content}</p>
            <small className="text-gray-500">{new Date(m.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerMessages;
