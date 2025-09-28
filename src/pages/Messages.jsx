import { useEffect, useState } from "react";
import api from "../services/api";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  // 🔹 Récupération des messages
  const fetchMessages = async () => {
    try {
      const res = await api.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Erreur récupération messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Envoi d’un nouveau message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await api.post("/messages", { content: newMessage });
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Erreur envoi message:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages 📩</h1>

      {/* Formulaire envoi message */}
      <form
        onSubmit={handleSendMessage}
        className="flex space-x-2 mb-6"
      >
        <input
          type="text"
          placeholder="Écrire un message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Envoyer
        </button>
      </form>

      {/* Liste messages */}
      {loading ? (
        <p>Chargement des messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-600">Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-3 border rounded bg-gray-50 shadow-sm"
            >
              <p className="font-semibold">{msg.senderName || "Utilisateur"}</p>
              <p>{msg.content}</p>
              <small className="text-gray-500">
                {new Date(msg.created_at).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Messages;
