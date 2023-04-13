import { combineReducers } from "redux";

import auth from "./login.reducer";
import inventarioReducer from "./inventario.reducer"; 
import productosReducer from "./productos.reducer"
import puntosReducer from "./puntos.reducer";

import distribuidor from "./distribuidores.reducer";



export default combineReducers({

  auth,
  inventarioReducer,
  productosReducer,
  puntosReducer,
  distribuidor
});
