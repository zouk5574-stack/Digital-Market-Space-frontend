import { FaUsers, FaBox, FaCreditCard, FaCogs } from "react-icons/fa";

export const adminLinks = [
  { to: "/admin/dashboard", label: "Tableau de bord", icon: <FaCogs /> },
  { to: "/admin/users", label: "Utilisateurs", icon: <FaUsers /> },
  { to: "/admin/products", label: "Produits", icon: <FaBox /> },
  { to: "/admin/payments", label: "Paiements", icon: <FaCreditCard /> },
  { to: "/admin/settings", label: "Paramètres", icon: <FaCogs /> },
];
