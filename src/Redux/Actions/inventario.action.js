import axios from 'axios'

import {
    MOSTRAR_INVENTARIOS,
    MOSTRAR_INVENTARIO_UNICO,
    AGREGAR_INVENTARIO,
    EDITAR_INVENTARIO,
    ELIMINAR_INVENTARIO,
    LIMPIAR_INVENTARIO,
    ERROR_INVENTARIO
} from "../Types/types";

import { AlertaModal } from "../../Components/Layouts/Alertas/ModalAlerta"

//Get Inventarios
export const mostrarInventarios = () => async dispatch => {

    dispatch({type: LIMPIAR_INVENTARIO})

    try {
        const res = await axios.get('http://localhost:5000/api/ver-inventario')

        dispatch({
            type: MOSTRAR_INVENTARIOS,
            payload: res.data.reverse()
        })
        
    } catch (err) {
        dispatch({
            type: ERROR_INVENTARIO,
            payload: { 
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
}

//Post Inventario
export const crearInventario = formData => async dispatch => {

    const config = {headers : {'Content-Type':'application/json'}}

    try {
        
        const res = await axios.post(`http://localhost:5000/api/guardar-inventario`, formData, config)
        console.log(res)
            
        dispatch({
            type: AGREGAR_INVENTARIO,
            payload: res.data
        })

        if (res.status == 200) {
            return AlertaModal({
                tituloModal: res.data.msg,
                tipoModal: 'success',
                colorModal: '#7cd164',
                tiempoModal: 2000
              })
        }

        

    } catch (err) {

        if(err.response){
            dispatch({
                type: ERROR_INVENTARIO,
                payload: { 
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}

export const limpiarInventario = () => {
    dispatch({
        type: LIMPIAR_INVENTARIO,
        payload: null
    })
}

