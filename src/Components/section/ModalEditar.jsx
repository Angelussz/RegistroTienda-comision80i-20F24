import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect,useState } from "react";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import * as Yup from "yup";
// import {object} from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
export const ModalEditar = ({ handleClose, show, producto, getProducto }) => {
  const [id, setId] = useState(undefined)
  useEffect(() => {
    if(producto){
      formik.setFieldValue("title",producto.title,true)
      formik.setFieldValue("description",producto.description,true)
      formik.setFieldValue("category",producto.category,true)
      setId(producto.id)
    }
  }, [producto]);

  // UTILIZAMOS USENAVIGATE DE REACT ROUTE DOM
  // const navigate = useNavigate();
  // UTILIZAMOS LA VARIABLE DE ENTORNO
  const API = import.meta.env.VITE_API;

  // Incio config formik
  const ProductoSquema = Yup.object().shape({
    title: Yup.string()
      .min(4, "min 4 caract.")
      .max(20, "max 20 caract.")
      .required("el titulo es requerido"),
    description: Yup.string()
      .min(4, "min 4 caract.")
      .max(200, "max 200 caract.")
      .required("la descripción es requerida"),
    category: Yup.string().required("la categoria es requerida"),
  });

  const initialValues = {
    title: "",
    description: "",
    category: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ProductoSquema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("Formik validado -->", values);
      Swal.fire({
        title: "Seguro que quieres editar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // console.log(producto.id)
          try {
            const response = await axios.put(`${API}/productos/${id}`,values);
            if (response.status === 200) {
              formik.resetForm();
              Swal.fire({
                title: "Exito",
                text: "Se modifico el producto",
                icon: "success",
              });
              closeModal()
            }
          } catch (error) {
            console.log("error -->", error);
          }
        }
      });
    },
  });

  const closeModal = ()=>{
    getProducto()
    formik.resetForm();
    handleClose();
  }

  return (
    <Modal show={show} onHide={closeModal} backdrop="static" data-bs-theme="dark" className="text-light">
      <Modal.Header closeButton>
        <Modal.Title>Modal Edición</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              {...formik.getFieldProps("title")}
              className={clsx(
                "form-control",
                {
                  "is-invalid": formik.touched.title && formik.errors.title,
                },
                {
                  "is-valid": formik.touched.title && !formik.errors.title,
                }
              )}
            />
            {/* {console.log(formik.touched.title)} */}
            {formik.touched.title && formik.errors.title && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{formik.errors.title}</span>
              </div>
            )}
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
              name="description"
              {...formik.getFieldProps("description")}
              className={clsx(
                "form-control",
                {
                  "is-invalid":
                    formik.touched.description && formik.errors.description,
                },
                {
                  "is-valid":
                    formik.touched.description && !formik.errors.description,
                }
              )}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{formik.errors.description}</span>
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="category"
              {...formik.getFieldProps("category")}
              className={clsx(
                "form-control",
                {
                  "is-invalid":
                    formik.touched.category && formik.errors.category,
                },
                {
                  "is-valid":
                    formik.touched.category && !formik.errors.category,
                }
              )}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Limpieza">Limpieza</option>
            </Form.Select>
            {formik.touched.category && formik.errors.category && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{formik.errors.category}</span>
              </div>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClose} className="mx-2">
            Guardar
          </Button>
          <Button variant="danger" onClick={()=>{
            closeModal()
          }
            } className="mx-2">
            Cerrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
