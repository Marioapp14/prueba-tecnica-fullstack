import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Productos from "./pages/Productos";
import Proveedores from "./pages/Proveedores";
import Categorias from "./pages/Categorias";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav style={styles.nav}>
        <h2 style={styles.logo}>Inventario</h2>

        <div style={styles.links}>
          <Link to="/" style={styles.link}> Productos</Link>
          <Link to="/proveedores" style={styles.link}> Proveedores</Link>
          <Link to="/categorias" style={styles.link}> Categorías</Link>
        </div>
      </nav>

      {/* Contenido */}
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/categorias" element={<Categorias />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#2c3e50",
    padding: "10px 20px",
    color: "white"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "15px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  },
  container: {
    padding: "20px"
  }
};