import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { validarCategoria } from "../../helpers/validaciones";
import clsx from "clsx";
import * as Yup from "yup";
// import {object} from "yup";
import { useFormik } from "formik";
export const CrearProducto = () => {
  // Los productos van a tener las siguientes props, titulo, descripcion, categoria, además va tener identificador unico
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("inicial");
  const ProductoSquema = Yup.object().shape({
    title: Yup.string()
      .min(4, "min 4 caract.")
      .max(20, "max 20 caract.")
      .required("el titulo es requerido"),
    description: Yup.string()
    .min(4, "min 4 caract.")
    .max(200, "max 200 caract.")
    .required("la descripción es requerida"),
    category: Yup.string().required("la categoria es requerida")
  });

  const initialValues = {
    title:"",
    description:"asdad",
    category:"Bebida"
  }

  const formik = useFormik({
    initialValues,
    validationSchema: ProductoSquema,
    validateOnBlur:true,
    validateOnChange:true,
    onSubmit: (values)=>{
      console.log("Formik validado -->",values);
    }
  })
  const handleSubmint = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      titulo: title,
      descripcion: description,
      categoria: category,
    };
    console.log("nuevo prioducto -->", nuevoProducto);
  };
  return (
    <div className="container py-3 my-3">
      <div className="text-center">
        <h2>Crear Producto</h2>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese titulo del producto"
            maxLength={20}
            minLength={4}
            // value={title}
            // onChange={(e) => {
            //   setTitle(e.currentTarget.value);
            // }}
            name="title"
            {...formik.getFieldProps('title')}
            
            className={clsx('form-control',
            {
              'is-invalid': formik.touched.title && formik.errors.title
            },
            {
              'is-valid': formik.touched.title && !formik.errors.title
            }
            )}
          />
          {console.log(formik.touched.title)}
          {formik.touched.title && formik.errors.title && (<div className="mt-2 text-danger fw-bolder">
            <span role="alert">{formik.errors.title}</span>
          </div>)}
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
            // value={description}
            // onChange={(e) => {
            //   setDescription(e.currentTarget.value);
            // }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoria</Form.Label>
          <Form.Select
            aria-label="Default select example"
            // value={category}
            // onChange={(e) => {
            //   let validacion = validarCategoria(e.currentTarget.value);
            //   console.log(validacion);
            //   setCategory(e.currentTarget.value);
            // }}
            // className={clsx(
            //   "form-select",
            //   {
            //     "is-valid":
            //       validarCategoria(category) && category !== "inicial",
            //   },
            //   {
            //     "is-invalid": !validarCategoria(category),
            //   }
            // )}
          >
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
