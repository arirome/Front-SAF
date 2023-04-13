import {
    VER_DISTRIBUIDORES_SUCCESS,
  } from "../Types/types";
  
  const INITIAL_STATE = {
    distribuidores: [],
    loading: {}
  };
  
  export default function (state = INITIAL_STATE, action) {
  
    switch (action.type) {
      case VER_DISTRIBUIDORES_SUCCESS:
        return {
          ...state,
          distribuidores: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
  