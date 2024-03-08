import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BorrarProducto } from "./borrarProducto/BorrarProducto";

export const Producto = ({ producto, handleShow, getProductos }) => {
  const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-between">
          <Button
            type="button"
            variant="warning"
            onClick={() => {
              navigate(`/editar/${producto.id}`);
            }}
          >
            Editar
          </Button>

          <Button
            type="button"
            variant="success"
            onClick={() => {
              console.log("llamar a modal")
              handleShow(producto)
            }}
          >
            M. Editar
          </Button>

          <BorrarProducto id={producto.id} getProductos={getProductos} />
        </td>
      </tr>
    </>
  );
};
