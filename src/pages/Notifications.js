import { useEffect, useState } from "react";
import api from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔹 Récupération des notifications
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Erreur récupération notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Marquer une notification comme lue
  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(
        notifications.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error("Erreur marquage notification:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications 🔔</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-600">Aucune notification disponible.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 rounded shadow-sm border ${
                notif.read ? "bg-gray-100" : "bg-white"
              }`}
            >
              <p className="font-semibold">{notif.title}</p>
              <p>{notif.message}</p>
              <small className="text-gray-500">
                {new Date(notif.created_at).toLocaleString()}
              </small>
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded"
                >
                  Marquer comme lue
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
