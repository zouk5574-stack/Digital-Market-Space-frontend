import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Produits from "./pages/Produits.jsx";
import Commandes from "./pages/Commandes.jsx";
import Messages from "./pages/Messages.jsx";
import Paiements from "./pages/Paiements.jsx";
import Parametres from "./pages/Parametres.jsx";
import Auth from "./pages/Auth.jsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/commandes" element={<Commandes />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/paiements" element={<Paiements />} />
          <Route path="/parametres" element={<Parametres />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
