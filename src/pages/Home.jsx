// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="card">
      <h2 className="text-3xl font-bold text-primary mb-4">
        🚀 Bienvenue sur Digital Market Space
      </h2>
      <p className="text-neutral-dark/80 mb-6">
        Achetez et vendez vos services et produits en toute simplicité.  
        Votre satisfaction est notre priorité 💚🛒
      </p>
      <Link
        to="/products"
        className="btn-accent inline-block px-6 py-3 rounded shadow hover:opacity-90"
      >
        Explorer les produits
      </Link>
    </div>
  );
}

export default Home;
