
import { fetchConToken } from "../../Components/helpers/fetch";

import { VER_DISTRIBUIDORES_SUCCESS } from "../Types/types";



export const VerDistribuidoresSuccess = (res) => {
  return {
    type: VER_DISTRIBUIDORES_SUCCESS,
    payload: res,
  };
};

//get all profiles
export const getDistribuidores = () => async (dispatch) => {
    const res = await fetchConToken(`ver-distribuidor`);
    const body = await res.json();
    
      dispatch(VerDistribuidoresSuccess(body));
      console.log("holaDistribuidor");
      console.log(body);
};



export default getDistribuidores;