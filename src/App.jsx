import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Produits from "./pages/Produits";
import Commandes from "./pages/Commandes";
import Messages from "./pages/Messages";
import Paiements from "./pages/Paiements";
import Parametres from "./pages/Parametres";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="produits" element={<Produits />} />
          <Route path="commandes" element={<Commandes />} />
          <Route path="messages" element={<Messages />} />
          <Route path="paiements" element={<Paiements />} />
          <Route path="parametres" element={<Parametres />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
