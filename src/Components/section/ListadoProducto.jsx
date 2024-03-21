import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Producto } from "./Producto";
import { ModalEditar } from "./ModalEditar";

export const ListadoProducto = () => {
  const [productos, setProductos] = useState([]);
  const API = import.meta.env.VITE_API;
  const [show, setShow] = useState(false);
  const [productEdit, setProductEdit] = useState(undefined);
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
      const response = await fetch(`${API}/products`);
      // console.log("RESPONSE -->",response);
      const resJson = await response.json();
      // console.log("RESJson -->", resJson);
      setProductos(resJson);
    } catch (error) {
      // console.log("ERROR -->", error);
    }
  };
  useEffect(() => {
    getProductos();

    return () => {
      setProductos([]);
    };
  }, []);

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
                  getProductos = {getProductos}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
