import axios from 'axios'

import { 
    USER_LOADED, AUTH_ERROR, 
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LIMPIAR_USER} from "../Types/types";

import setAuthToken from '../../Components/Helpers/setAuthToken'

//LOGIN USUARIO
export const loginUser = (correo, password) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({correo, password})

    console.info('body=>',body)

    try {
        const res = await axios.post('http://localhost:5000/api/login', body, config)

        console.log(res)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
        
    } catch (err) {

        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(console.log(error)))
        }
        
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const loadUser = () => async dispatch => {

    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        
        const res = await axios.get('http://localhost:5000/api/loadUser')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const logout = () => dispatch => {
   dispatch({type : LOGOUT }) 
   dispatch({type: LIMPIAR_USER})
} 
