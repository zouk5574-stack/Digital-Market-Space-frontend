import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-primary text-white p-4 shadow flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold">DMS</div>
        <Link to="/" className="font-semibold">Digital Market Space</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/products" className="hover:underline">Produits</Link>
        {user ? (
          <>
            <span className="hidden sm:inline">Bonjour, {user.first_name || user.name || user.phone}</span>
            <button onClick={logout} className="bg-white text-primary px-3 py-1 rounded">Déconnexion</button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-primary px-3 py-1 rounded">Connexion</Link>
        )}
      </div>
    </header>
  );
}
