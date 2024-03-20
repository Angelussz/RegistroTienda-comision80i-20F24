import { Foot } from "./Components/Foot";
import { Navbarr } from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Components/pages/Home";
import { AcercaDeNosotros } from "./Components/pages/AcercaDeNosotros";
import { Administracion } from "./Components/pages/Administracion";
import { CrearProducto } from "./Components/section/CrearProducto";
import { Editar } from "./Components/section/Editar";
import { ErrorPage } from "./Components/pages/ErrorPage";
import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  const SaveAuth = (auth)=>{
    sessionStorage.setItem("auth",JSON.stringify(auth));
  }
  const GetAuth = ()=>{
    return JSON.parse(sessionStorage.getItem("auth"));
  }
  const RemoveAuth = ()=>{
    sessionStorage.removeItem("auth");
  }
  useEffect(() => {
    const session = GetAuth()
    if(session){
      setCurrentUser(session)
    }
  
    return () => {
      setCurrentUser(undefined)
    }
  }, [])
  useEffect(() => {
    if(currentUser !== undefined){
      axios.defaults.headers.common["Authorization"] = `Bearer ${currentUser.token}`
    }else{
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [currentUser])
  
  
  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, SaveAuth, RemoveAuth, GetAuth }}>
        <BrowserRouter>
          <header>
            <Navbarr />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/acercadenosotros" element={<AcercaDeNosotros />} />
              {(currentUser !== undefined && currentUser.role === "Admin") && (
                <Route path="/administracion" element={<Administracion />} />
              )}

              <Route path="/crear-producto" element={<CrearProducto />} />
              <Route path="/editar/:id" element={<Editar />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </main>
          <footer>
            <Foot />
          </footer>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
