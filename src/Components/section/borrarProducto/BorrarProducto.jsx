import React from "react";
import "./BorrarProducto.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2'
export const BorrarProducto = ({ id, getProductos }) => {
  const API = import.meta.env.VITE_API;

  const handleDelete = () => {
    // try {

    //     await axios.delete(`${API}/productos/${id}`)
    //     getProductos()
    // } catch (error) {
    //     console.log("Error -->",error.message)
    // }
    Swal.fire({
      title: "Estas seguro que quieres eliminar este producto?",
      text: "No puedes revertir este proceso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar?",
      cancelButtonText:"No, me equivoque"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API}/products/${id}`);
          getProductos()
          // console.log("Response: ",response);
          // console.log("Response status: ",response.status);
        } catch (error) {
          console.log("error -->", error);
        }
        Swal.fire({
          title: "Exito",
          text: "Se elimino el producto producto",
          icon: "success",
        });
      }
    });
  };
  return (
    <Button type="button" variant="danger" onClick={handleDelete}>
      Eliminar
    </Button>
  );
};
