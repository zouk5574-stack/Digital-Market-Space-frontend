import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      {/* 🔹 Navbar */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">
            Digital <span className="text-accent">Market</span>
          </h1>
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-accent transition">
              Accueil
            </Link>
            <Link to="/products" className="hover:text-accent transition">
              Produits
            </Link>
            <Link to="/orders" className="hover:text-accent transition">
              Commandes
            </Link>
            <Link to="/messages" className="hover:text-accent transition">
              Messages
            </Link>
          </nav>
        </div>
      </header>

      {/* 🔹 Main Content */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-md border-r border-neutral-dark/10">
          <ul className="p-6 space-y-4 text-neutral-dark">
            <li>
              <Link to="/profile" className="hover:text-primary">
                👤 Mon Profil
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-primary">
                🛒 Mon Panier
              </Link>
            </li>
            <li>
              <Link to="/settings" className="hover:text-primary">
                ⚙️ Paramètres
              </Link>
            </li>
          </ul>
        </aside>

        {/* Page Content */}
        <section className="flex-1 p-6">
          <Outlet />
        </section>
      </main>

      {/* 🔹 Footer */}
      <footer className="bg-primary text-white py-4 text-center mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} Digital Market Space —{" "}
          <span className="text-accent">Votre satisfaction est notre priorité</span>
        </p>
      </footer>
    </div>
  );
}

export default Layout;
