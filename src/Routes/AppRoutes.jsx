import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Login from '../Views/Login/Login';
import Panel from '../Views/Dashboard/Panel/Panel';
import setAuthToken from "../Components/helpers/setAuthToken";
import store from '../Redux/Store/Store'
import { loadUser } from "../Redux/Actions/login.action";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Inventario from '../Views/Dashboard/Inventario/Inventario';
import AgregarInventario from "../Views/Dashboard/Inventario/Modulos Inventario/AgregarInventario";
import ParteDelDia from "../Views/Dashboard/ParteDelDia/ParteDelDia";
import Productos from "../Views/Dashboard/Productos/Productos";
import Puntos from "../Views/Dashboard/Puntos/Puntos";
import TablaUsuarios from "../Views/Dashboard/TablaUsuarios/TablaUsuarios";
import LandingPage from "../Views/LandingPage/LandingPage";
import RegistroDePuntos from "../Views/Dashboard/Puntos/ModulosPuntos/RegistroDePuntos";
import RegistroProductos from "../Views/Dashboard/Productos/ModulosProductos/RegistroProductos";
import RegistroEditProducto from "../Views/Dashboard/Productos/ModulosProductos/RegistroEditProducto";
import VerProducto from "../Views/Dashboard/Productos/ModulosProductos/VerProducto";
import RegistroEditPunto from "../Views/Dashboard/Puntos/ModulosPuntos/RegistroEditPunto";
import VerPunto from "../Views/Dashboard/Puntos/ModulosPuntos/VerPunto";

const AppRoutes = ({ auth: { isAuthenticated, loading } }) => {



  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  if (isAuthenticated) {

    /* Rutas Privadas */
    return (
      <Router>
        <Switch>
          <Route exact path={"/panel"} component={Panel} />
          <Route exact path={"/inventario"} component={Inventario}/>
          <Route exact path={"/agregar-inventario"} component={AgregarInventario}/> 
          <Route exact path={"/parte-del-dia"} component={ParteDelDia}/> 
          <Route exact path={"/productos"} component={Productos}/> 
          <Route exact path={"/puntos"} component={Puntos}/> 
          <Route exact path={"/usuarios"} component={TablaUsuarios}/> 
          <Route exact path={"/agregar-punto"} component={RegistroDePuntos}/> 
          <Route exact path={"/agregar-producto"} component={RegistroProductos}/> 
          <Route exact path={"/editarPunto/:id"} component={RegistroEditPunto}/>
          <Route exact path={"/editarProducto/:id"} component={RegistroEditProducto}/> 
          <Route exact path={"/verProducto/:id"} component={VerProducto}/> 
          <Route exact path={"/verPunto/:id"} component={VerPunto}/> 
          <Route exact path={"/*"} component={Panel} />
        </Switch>
      </Router>

    )
  } else {
    /* Rutas Publicas */
    return (
      <Router>
        <Switch>
          <Route exact path={"/*"} component={Login} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/"} component={LandingPage} />
        </Switch>
      </Router>
    )
  }


}

AppRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AppRoutes)