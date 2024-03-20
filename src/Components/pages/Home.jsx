import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import userContext from "../../context/UserContext";
import axios from "axios";
import { CardProducto } from "../section/CardProducto";
export const Home = () => {
  const {currentUser} = useContext(userContext)
  const [productos, setProductos] = useState([]);
  const API = import.meta.env.VITE_API;
  console.log(API)
  const getProductos = async () => {
    try {
      const response = await axios.get(`${API}/productos`);
      console.log("RESPONSE AXIOS -->",response);
      // const produc = response.data;
      // setProductos(response.data);
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
  console.log("current user --->",currentUser)
  return (
    <div>
      <div className="text-center">
        <h2>Catalogo de productos</h2>
      </div>
      <div className="my-5">
        <Container>
          <Row>
            {productos.map((producto)=> <CardProducto key={producto.id} producto={producto} />)}
          </Row>
        </Container>
      </div>
    </div>
  );
};
