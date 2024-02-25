import { Button } from "react-bootstrap";

export const Producto = ({producto}) => {
  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-between">
            <Button type="button" variant="warning">Editar</Button>
            <Button type="button" variant="danger">Eliminar</Button>
        </td>
      </tr>
    </>
  );
};
