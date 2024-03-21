import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BorrarProducto } from "./borrarProducto/BorrarProducto";

export const Producto = ({ producto, handleShow, getProductos }) => {
  const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{producto._id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-between">
          <Button
            type="button"
            variant="warning"
            onClick={() => {
              navigate(`/editar/${producto._id}`);
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

          <BorrarProducto id={producto._id} getProductos={getProductos} />
        </td>
      </tr>
    </>
  );
};
