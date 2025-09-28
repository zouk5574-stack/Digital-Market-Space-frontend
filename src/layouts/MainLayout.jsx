import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-teal-600 text-white p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Digital Market Space</Link>
        <nav className="flex gap-4">
          <Link to="/produits">Produits</Link>
          <Link to="/commandes">Commandes</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/paiements">Paiements</Link>
          <Link to="/parametres">Paramètres</Link>
          <Link to="/auth">Connexion</Link>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        © {new Date().getFullYear()} Digital Market Space - Votre satisfaction est notre priorité 💪
      </footer>
    </div>
  );
}
