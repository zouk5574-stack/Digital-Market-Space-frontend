import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow">
      <Link to="/" className="text-2xl font-bold flex items-center gap-2">
        🛒 Digital Market Space
      </Link>
      <div className="flex gap-4">
        <Link to="/buyer/dashboard" className="hover:text-accent">Acheteur</Link>
        <Link to="/seller/dashboard" className="hover:text-accent">Vendeur</Link>
        <Link to="/admin/dashboard" className="hover:text-accent">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
