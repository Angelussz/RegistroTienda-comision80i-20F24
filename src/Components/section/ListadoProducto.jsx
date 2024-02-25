import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Producto } from "./Producto";
export const ListadoProducto = () => {
  const [productos, setProductos] = useState([]);
  const API = import.meta.env.VITE_API;
  const getProductos = async () => {
    try {
      const response = await fetch(`${API}/productos`);
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
    <div className="container-fluid">
      <div className="text-center">
        <h2>Listado productos</h2>
      </div>
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
            <Producto producto={product} key={product.id} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
