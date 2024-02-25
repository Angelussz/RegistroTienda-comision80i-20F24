import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
export const CardProducto = ({ producto }) => {
  return (
    <Col xs={12} md={6}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{producto.title}</Card.Title>
          <Card.Text className="my-2">
            {producto.description}
          </Card.Text>
          <Card.Text className="fs-4">
            {producto.category}
          </Card.Text>
          <Button variant="primary">Ver mas</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
