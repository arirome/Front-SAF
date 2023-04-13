import {
  MOSTRAR_PUNTOS,
  ERROR_PUNTO,
  LIMPIAR_PUNTOS,
  ACTUALIZAR_PUNTO,
  MOSTRAR_PUNTO_UNICO,
  AGREGAR_PUNTO,
  ELIMINAR_PUNTOS,
} from "../Types/types";

import axios from "axios";

import { fetchConToken } from "../../Components/Helpers/fetch";

import imagenSucesss from "../../../src/Components/Assets/Images/paqueteOK.png"
import imagenSucesssEdit from "../../../src/Components/Assets/Images/educacion.png"

//GET Puntos
export const mostrarPunto = () => async (dispatch) => {
  dispatch({ type: LIMPIAR_PUNTOS });

  try {
    const res = await axios.get("http://localhost:5000/api/ver-puntos");

    dispatch({
      type: MOSTRAR_PUNTOS,
      payload: res.data.reverse(),
    });
  } catch (err) {
    dispatch({
      type: ERROR_PUNTO,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//GET punto

export const mostrarPuntoUnico = (id) => async dispatch => {

  
  const res = await fetchConToken(`ver-punto/${id}`);
  const body = await res.json();


 
  dispatch({
    type: MOSTRAR_PUNTO_UNICO,
    payload: body,
})
  console.log("hola");
  console.log(res);
}




//POST Puntos

export const fetchRegistroPunto = (nombre,departamento,barrio,descripcion, punto) => {

  return async (dispatch) => {

    try {
      const resp = await fetchConToken(
        "guardar-punto",
        { nombre,departamento,barrio,descripcion },
        "POST"
      );
      
      
   
      dispatch({
        type: AGREGAR_PUNTO,
        payload: punto,
        
      });
    
    
      if (resp.ok) {
        Swal.fire({
  
          position: "center",
          title: "Punto enviado",
          imageUrl: imagenSucesss,
          imageWidth: 200,
          imageHeight: 200,
          showConfirmButton: false,
          timer: 3000,
         
      
        })
      } else {

        console.log("hola");
  
        Swal.fire({
          position: "center",
          icon: "error",
          title: "error, revise los datos ingresados",
          
          showConfirmButton: false,
          timer: 1000,
        });
  
      }
    
    } catch (err) {
      if (err.response) {
        dispatch({
          type: ERROR_PUNTO,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
   

   
  };
};




//PUT Puntos

export const updatePuntos = (punto) => {
  return ({
    type: ACTUALIZAR_PUNTO,
    payload: punto
  })
}


export const startUpdatePunto = (punto, id) => async (dispatch) => {
  const resp = await fetchConToken(`actualizar-punto/${id}`, punto, 'PUT');

  if (resp.ok) {
    dispatch(updatePuntos(punto));
    Swal.fire({
      position: "center",
      title: "Punto Actualizado",
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

//LIMPIAR Puntos

export const limpiarPunto = () => {
  dispatch({
    type: LIMPIAR_PUNTOS,
    payload: null,
  });
};

//DELETE Puntos

export const eliminarPunto = (id) => async (dispatch) => {
  console.log(id);
  try {
    await axios.delete(`http://localhost:5000/api/delete-punto/${id}`);

    dispatch({
      type: ELIMINAR_PUNTOS,
      payload: id,
    });

    /* dispatch(setAlert('Post eliminado', 'success'))    */
  } catch (err) {
    console.log(err);
  }
};
