import React from 'react'
import { CrearProducto } from '../section/CrearProducto'
import { ListadoProducto } from '../section/ListadoProducto'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const Administracion = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='container my-3 py-3'>
        <Button variant='primary' onClick={()=>{
          navigate("/crear-producto")
          // console.log("presionado")
        }}>Crear Producto</Button>
      </div>
      <ListadoProducto/>
    </div>
  )
}
