import {
    MOSTRAR_INVENTARIOS,
    MOSTRAR_INVENTARIO_UNICO,
    AGREGAR_INVENTARIO,
    EDITAR_INVENTARIO,
    ELIMINAR_INVENTARIO,
    LIMPIAR_INVENTARIO,
    ERROR_INVENTARIO
} from "../Types/types";

const initialState = {
    inventarios: [],
    inventario: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case MOSTRAR_INVENTARIOS:
            return {
                ...state,
                inventarios: payload,
                loading: false
            }
        case MOSTRAR_INVENTARIO_UNICO:
            return {
                ...state,
                inventario: payload,
                loading: false
            }
        case AGREGAR_INVENTARIO:
            return {
                ...state,
                inventarios: [payload, ...state.inventarios],
                loading: false,
            };
        case LIMPIAR_INVENTARIO:
            return {
                ...state,
                inventarios: [],
                inventario: null,
                loading: false
            }
        case ERROR_INVENTARIO:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }

}