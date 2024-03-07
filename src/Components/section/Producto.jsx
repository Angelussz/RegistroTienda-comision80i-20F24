import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Producto = ({producto}) => {
  const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-between">
            <Button type="button" variant="warning" onClick={()=>{
              navigate(`/editar/${producto.id}`)
            }}>Editar</Button>
            <Button type="button" variant="danger" onClick={()=>{
              console.log("desde boton eliminar")
            }}>Eliminar</Button>
        </td>
      </tr>
    </>
  );
};
