import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Producto } from "./Producto";
import { ModalEditar } from "./ModalEditar";
import { Col, Form, Row } from "react-bootstrap";

export const ListadoProducto = () => {
  const [productos, setProductos] = useState([]);
  const API = import.meta.env.VITE_API;
  const [show, setShow] = useState(false);
  const [productEdit, setProductEdit] = useState(undefined);
  const [filtroProducto, setFiltroProducto] = useState("");
  const [busquedaTitulo, setBusquedaTitulo] = useState("");
  console.log(filtroProducto);
  const handleClose = () => {
    setProductEdit(undefined);
    setShow(false);
  };
  const handleShow = (prod) => {
    setProductEdit(prod);
    setShow(true);
  };

  const getProductos = async () => {
    try {
      let URL = `${API}/products`;
      if (filtroProducto !== "" && busquedaTitulo ==="") {
        URL = `${API}/products?filtro=${filtroProducto}`;
      }else if(filtroProducto !== "" && busquedaTitulo !==""){
        URL = `${API}/products?filtro=${filtroProducto}&busqueda=${busquedaTitulo}`;
      }else if(filtroProducto === "" && busquedaTitulo !==""){
        URL = `${API}/products?busqueda=${busquedaTitulo}`;
      }
      const response = await fetch(URL);
      // console.log("RESPONSE -->",response);
      const resJson = await response.json();
      // console.log("RESJson -->", resJson);
      setProductos(resJson);
    } catch (error) {
      // console.log("ERROR -->", error);
    }
  };
  // useEffect(() => {
  //   getProductos();

  //   return () => {
  //     setProductos([]);
  //   };
  // }, []);
  useEffect(() => {
    getProductos();
  }, [filtroProducto,busquedaTitulo]);
  return (
    <>
      <ModalEditar
        show={show}
        handleClose={handleClose}
        producto={productEdit}
        getProducto={getProductos}
      />
      <div className="container-fluid">
        <div className="text-center">
          <h2>Listado productos</h2>
        </div>
        <div className="container-fluid">
          <Row>
            <Col xs={12} md={6}>
              <Form>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Filtrar por categoría</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="category"
                    value={filtroProducto}
                    onChange={(e) => {
                      setFiltroProducto(e.currentTarget.value);
                    }}
                  >
                    <option value="">Todos los productos</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Limpieza">Limpieza</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={12} md={6}>
              <Form onSubmit={(e)=>{
                e.preventDefault();

              }}>
                <Form.Group controlId="busqueda">
                  <Form.Label>Buscar por Titulo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese titulo del producto"
                    maxLength={20}
                    minLength={4}
                    name="title"
                    onChange={(e)=>{
                      setBusquedaTitulo(e.currentTarget.value)
                    }}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Titulo</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((product) => (
                <Producto
                  producto={product}
                  key={product._id}
                  handleShow={handleShow}
                  getProductos={getProductos}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
