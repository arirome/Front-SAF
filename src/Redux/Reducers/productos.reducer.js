import {
  MOSTRAR_PRODUCTOS,
  LIMPIAR_PRODUCTOS,
  AGREGAR_PRODUCTO,
  ACTUALIZAR_PRODUCTO,
  ERROR_PRODUCTO,
  MOSTRAR_PRODUCTO_UNICO,
  UPDATE_PRODUCTOS,
  ELIMINAR_PRODUCTOS
} from "../Types/types";

const initialState = {
  productos: [],
  producto: null,
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
      case MOSTRAR_PRODUCTOS:
          return {
            productos: payload,
            producto: null,
            loading: false,
            error: {}
          }
      case MOSTRAR_PRODUCTO_UNICO:
          return {
            productos: [],
            producto: payload,
            loading: false,
            error: {}
          }
      case AGREGAR_PRODUCTO:
        return {
          loading: false,
          productos: action.payload,
          error: '',
        };
        case UPDATE_PRODUCTOS:
          return {
            ...state,
            loading: false
          }
    
      case LIMPIAR_PRODUCTOS:
          return {
            productos: [],
            producto: null,
            loading: false,
            error: {}
          }
      case ERROR_PRODUCTO:
          return {
            productos: [],
            producto: null,
            error: payload,
            loading: false
          }
          
      default:
          return state
  }

}
