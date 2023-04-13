import { 
  MOSTRAR_PRODUCTOS,
  LIMPIAR_PRODUCTOS,
  AGREGAR_PRODUCTO,
  ACTUALIZAR_PRODUCTO,
  ERROR_PRODUCTO,
  UPDATE_PRODUCTOS ,
  MOSTRAR_PRODUCTO_UNICO,
  ELIMINAR_PRODUCTOS
 } from "../Types/types";

import { fetchConToken } from "../../Components/helpers/fetch";
import axios from 'axios'
import imagenSucesss from "../../../src/Components/Assets/Images/paqueteOK.png"

import imagenSucesssEdit from "../../../src/Components/Assets/Images/educacion.png"


//GET Productos
export const mostrarProductos = () => async dispatch => {

  dispatch({type: LIMPIAR_PRODUCTOS})

  try {
      const res = await axios.get('http://localhost:5000/api/ver-producto')

      dispatch({
          type: MOSTRAR_PRODUCTOS,
          payload: res.data.reverse()
      })
      
  } catch (err) { 
    
      dispatch({
          type: ERROR_PRODUCTO,
          payload: { 
              msg: err.response.statusText,
              status: err.response.status
          }
      })
  }
}


//GET Producto
export const mostrarProductoUnico = (id) => async dispatch => {

  
  const res = await fetchConToken(`ver-producto/${id}`);
  const body = await res.json();


 
  dispatch({
    type: MOSTRAR_PRODUCTO_UNICO,
    payload: body,
})
  console.log("hola");
  console.log(res);
}



//POST Productos

export const fetchRegistroProducto = (nombre,distribuidor,unidad,descripcion, precio, producto) => {

  return async (dispatch) => {

    try {
      const resp = await fetchConToken(
        "guardar-producto",
        { nombre,distribuidor,unidad,descripcion, precio },
        "POST"
      );
      
      
   
      dispatch({
        type: AGREGAR_PRODUCTO,
        payload:producto
        
      });
    
    
      if (resp.status == 200) {
        Swal.fire({
  
          position: "center",
          title: "Producto enviado",
          imageUrl: imagenSucesss,
          imageWidth: 200,
          imageHeight: 200,
          showConfirmButton: false,
          timer: 3000,
         
      
        })
      }
    } catch (err) {
      if (err.response) {
        dispatch({
          type: ERROR_PRODUCTO,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
   

   
  };
};


//LIMPIAR Productos

export const limpiarProducto  = () => {
  dispatch({
      type: LIMPIAR_PRODUCTOS,
      payload: null
  })
}

//PUT Productos

export const updateProductos = (producto) => {
  return ({
    type: ACTUALIZAR_PRODUCTO,
    payload: producto
  })
}

export const startUpdate = (producto, id) => async (dispatch) => {
  const resp = await fetchConToken(`actualizar-producto/${id}`, producto, 'PUT');

  if (resp.ok) {
    dispatch(updateProductos(producto));
    Swal.fire({
      position: "center",
      title: "Producto Actualizado",
      imageUrl: imagenSucesssEdit,
      imageWidth: 200,
      imageHeight: 200,
      showConfirmButton: false,
      timer: 3000,
    })
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "error, revise los datos ingresados",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  console.log("holaUpdate");
  console.log(resp);

};

//DELETE Productos

export const eliminarProducto = (id) => async dispatch => {  
    console.log(id)
        try {
    
            await axios.delete(`http://localhost:5000/api/delete-producto/${id}`)
        
            dispatch({
                type: ELIMINAR_PRODUCTOS,
                payload: id
            })
    
            /* dispatch(setAlert('Post eliminado', 'success'))    */ 
            
            
        } catch (err) {
            console.log(err)
        } 
    }





