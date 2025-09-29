import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

/**
 * ProtectedRoute
 * Protège une route selon :
 *  - Authentification
 *  - Expiration du token JWT
 *  - Rôle utilisateur
 */
export default function ProtectedRoute({ children, role }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Pas d'utilisateur connecté → redirection login
  if (!user) {
    toast.warn("Veuillez vous connecter pour accéder à cette page.");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Vérification du token JWT
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        logout();
        toast.error("Votre session a expiré, reconnectez-vous.");
        return <Navigate to="/auth" state={{ from: location }} replace />;
      }
    } catch (err) {
      console.error("Erreur de décodage du token:", err);
      logout();
      return <Navigate to="/auth" replace />;
    }
  }

  // Vérification du rôle
  if (role && user.role !== role) {
    toast.error("Accès refusé : rôle non autorisé.");
    return <Navigate to="/" replace />;
  }

  // Sinon → autorisation
  return children;
}
