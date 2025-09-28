import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  const common = [
    { to: "/", label: "Accueil" },
    { to: "/products", label: "Produits" }
  ];

  const admin = [
    { to: "/admin", label: "Admin" },
    { to: "/admin/users", label: "Utilisateurs" },
    { to: "/admin/settings", label: "Paramètres" }
  ];

  const seller = [
    { to: "/seller", label: "Vendeur" },
    { to: "/seller/products", label: "Mes produits" },
    { to: "/seller/withdrawals", label: "Retraits" }
  ];

  const buyer = [
    { to: "/buyer", label: "Acheteur" },
    { to: "/buyer/orders", label: "Mes commandes" }
  ];

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-6">
        <h3 className="font-bold text-lg">Digital Market Space</h3>
      </div>
      <nav className="p-4 space-y-2">
        {common.map((l) => (
          <NavLink key={l.to} to={l.to} className={({isActive})=> isActive ? "block p-2 rounded bg-primary text-white" : "block p-2 rounded hover:bg-neutral-100"}>
            {l.label}
          </NavLink>
        ))}

        {user?.role === "admin" && admin.map(l=>(
          <NavLink key={l.to} to={l.to} className={({isActive})=> isActive ? "block p-2 rounded bg-primary text-white" : "block p-2 rounded hover:bg-neutral-100"}>{l.label}</NavLink>
        ))}

        {user?.role === "seller" && seller.map(l=>(
          <NavLink key={l.to} to={l.to} className={({isActive})=> isActive ? "block p-2 rounded bg-primary text-white" : "block p-2 rounded hover:bg-neutral-100"}>{l.label}</NavLink>
        ))}

        {user?.role === "buyer" && buyer.map(l=>(
          <NavLink key={l.to} to={l.to} className={({isActive})=> isActive ? "block p-2 rounded bg-primary text-white" : "block p-2 rounded hover:bg-neutral-100"}>{l.label}</NavLink>
        ))}
      </nav>
    </aside>
  );
}
