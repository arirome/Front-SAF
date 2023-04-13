import { mostrarInventarios } from "../../../Redux/Actions/inventario.action"
import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from '../../../Components/Layouts/Container/Container'
import Footer from '../../../Components/Layouts/Footers/Footer'
import Spinner from "../../../Components/Layouts/Spinners/Spinner";
import faceIMG from "../../../Components/Assets/images/faces/face1.jpg"
import './Inventario.css'
import { Link } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Inventario = ({ mostrarInventarios, inventario: { inventarios, loading } }) => {

  useEffect(() => {
    mostrarInventarios();
  }, []);

  // console.log()
  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">

          {
            loading ? <Spinner />
              :
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Inventario
                      <div className="float-right">
                        <Link to="/agregar-inventario">
                        <Tooltip title="Agregar Nuevo..." className="">
                          <IconButton>
                            <AddCircleIcon style={{ color: '#78ae62' }} />
                          </IconButton>
                        </Tooltip>
                        </Link>
                      </div>
                    </h4>
                    {/*  <Tooltip title="Agregar Nuevo Producto Al Inventario...">
                    <button type="button" class="btn btn-inverse-primary btn-rounded btn-icon ">
                      <i class="ti-clipboard"></i>
                    </button>
                    </Tooltip> */}


                    {/* <p class="card-description">
                    Add class <code>.table-striped</code>
                  </p> */}
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr Align='center'>
                            <th>
                              #
                            </th>
                            <th>
                              Nombre
                            </th>
                            <th>
                              Apellido
                            </th>
                            <th>
                              Cantidad de productos
                            </th>
                            <th>
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            inventarios.length > 0 ?
                              <>
                                {
                                  inventarios?.map((inventario) => {
                                    console.log(inventario)
                                    return (
                                      <tr Align='center'>
                                        <td class="py-1">
                                          <img src="https://images.vexels.com/media/users/3/199820/isolated/preview/892bfdfcb80b356c53405aafbb716513-caja-de-carton-isometrica.png" alt="image" />
                                        </td>
                                        <td>
                                          {inventario?.usuario?.nombre}
                                        </td>
                                        <td>
                                          {inventario?.usuario?.apellido}
                                        </td>
                                        <td>
                                          {inventario?.totalDeProductos}
                                        </td>
                                        <td>
                                          <button type="button" class="btn btn-inverse-success btn-icon">
                                            <i class="ti-eye"></i>
                                          </button>
                                          <button type="button" class="btn btn-inverse-warning btn-icon mx-2">
                                            <i class="ti-pencil"></i>
                                          </button>
                                          <button type="button" class="btn btn-inverse-danger btn-icon">
                                            <i class="ti-trash"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    )
                                  })
                                }
                              </>
                              :
                              <Spinner Align="center"/>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
          }
        </div>
        <Footer />
      </div>
    </Container>
  )
}

Inventario.propTypes = {
  mostrarInventarios: PropTypes.func.isRequired,
  inventarios: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  inventario: state.inventarioReducer,
});

export default connect(mapStateToProps, { mostrarInventarios })(Inventario);
