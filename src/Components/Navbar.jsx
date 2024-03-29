import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Login } from "./section/Login";
import { useContext, useState } from "react";
import userContext from "../context/UserContext";
export const Navbarr = () => {
  const { currentUser, setCurrentUser, RemoveAuth } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleShow = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const Logout = () => {
    RemoveAuth();
    setCurrentUser(undefined);
  };
  return (
    <>
      <Login isOpen={isOpen} handleClose={handleClose} />
      <Navbar
        expand="lg"
        className="bg-body-dark"
        data-bs-theme="dark"
        bg="dark"
      >
        <Container>
          <NavLink to={"/"} className={"nav-link"}>
            <Navbar.Brand>CRUD</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/acercadenosotros">Acerca de nosotros</Nav.Link>
            <Nav.Link href="/administracion">Admin</Nav.Link> */}
              <NavLink to={"/"} className={"nav-link"}>
                Inicio
              </NavLink>
              <NavLink to={"/acercadenosotros"} className={"nav-link"}>
                Acerca de nosotros
              </NavLink>
              {/* Colocar aqui (currentUser !== undefined && currentUser.role === "Admin") o sino da problemas y pretier lo modifica  */}
              {currentUser !== undefined && currentUser.role === "Admin" && (
                <NavLink to={"/administracion"} className={"nav-link"}>
                  Admin(as)
                </NavLink>
              )}
            </Nav>
            <Nav>
              {currentUser === undefined && (
                <Button
                  variant="primary"
                  className="mx-2 my-2 my-ml-0"
                  onClick={handleShow}
                >Login</Button>
              )}
              {currentUser !== undefined &&
                <Button
                  variant="danger"
                  className="mx-2 my-2 my-ml-0"
                  onClick={Logout}
                >
                  Logout
                </Button>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
