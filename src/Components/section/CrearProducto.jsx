import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export const CrearProducto = () => {
  // Los productos van a tener las siguientes props, titulo, descripcion, categoria, además va tener identificador unico
  const handleSubmint = (e)=>{
    e.preventDefault();
    console.log("sd")
  }
  return (
    <div className="container py-3 my-3">
      <div className="text-center">
        <h2>Crear Producto</h2>
      </div>
      <Form onSubmit={handleSubmint}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese titulo del producto"
            maxLength={20}
            minLength={4}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese descripción del producto"
            as="textarea"
            rows={3}
            minLength={4}
            maxLength={200}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoria</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="">Seleccione una categoría</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Limpieza">Limpieza</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
