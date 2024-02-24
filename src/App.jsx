import { Foot } from "./Components/Foot";
import { Navbarr } from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Components/pages/Home";
import { AcercaDeNosotros } from "./Components/pages/AcercaDeNosotros";
import { Administracion } from "./Components/pages/Administracion";
import { CrearProducto } from "./Components/section/CrearProducto";
function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbarr />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acercadenosotros" element={<AcercaDeNosotros />} />
            <Route path="/administracion" element={<Administracion />} />
            <Route path="/crear-producto" element={<CrearProducto />} />
          </Routes>
        </main>
        <footer>
          <Foot />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
