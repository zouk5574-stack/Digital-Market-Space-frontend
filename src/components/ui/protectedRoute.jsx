// src/components/ui/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6">Chargement...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (roles.length && !roles.includes(user.role)) {
    // not authorized
    return <div className="p-6">Accès refusé — vous n'avez pas les droits nécessaires.</div>;
  }

  return children;
}
