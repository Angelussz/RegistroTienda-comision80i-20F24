import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { validarCategoria } from "../../helpers/validaciones";
import clsx from "clsx";
import * as Yup from "yup";
// import {object} from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Editar = () => {
  const [producto, setProducto] = useState(undefined);
  const { id } = useParams();
  // UTILIZAMOS LA VARIABLE DE ENTORNO
  const API = import.meta.env.VITE_API;

  const getProducto = async () => {
    try {
      const { data } = await axios.get(`${API}/products/${id}`);
      // console.log(data)
      setProducto(data)
    } catch (error) {
      console.log("ERROR -->", error);
      return `Error ${error}`;
    }
  };

  // console.log(id)
  useEffect(() => {
    getProducto()
  }, []);

  // UTILIZAMOS USENAVIGATE DE REACT ROUTE DOM
  const navigate = useNavigate();

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
          try {
            const updateProduct = {
              _id:producto._id,
              title:values.title,
              category:values.category,
              description:values.description
            }
            // const response = await fetch(`${API}/productos/${id}`, {
            //   method: "PUT",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify(values),
            // });
            const response = await axios.put(`${API}/products/update`,updateProduct)
            // console.log("Response: ",response);
            // console.log("Response status: ",response.status);
            if (response.status === 200) {
              formik.resetForm();
              Swal.fire({
                title: "Exito",
                text: "Se modifico el producto",
                icon: "success",
              });
              navigate("/administracion")
            }
          } catch (error) {
            console.log("error -->", error);
          }
        }
      });
    },
  });
  useEffect(()=>{
    if(producto !== undefined){
        formik.setFieldValue("title",producto.title,true);
        formik.setFieldValue("description",producto.description,true);
        formik.setFieldValue("category",producto.category,true);
    }
  },[producto])
  return (
    <div className="container py-3 my-3">
      <Button
        variant="secondary"
        onClick={() => {
          navigate(-1);
        }}
      >
        Atras
      </Button>
      <div className="text-center">
        <h2>Editar producto</h2>
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
                "is-invalid": formik.touched.category && formik.errors.category,
              },
              {
                "is-valid": formik.touched.category && !formik.errors.category,
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
