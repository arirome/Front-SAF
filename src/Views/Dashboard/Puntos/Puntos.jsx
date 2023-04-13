import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../../../Components/Layouts/Container/Container";
import Footer from "../../../Components/Layouts/Footers/Footer";
import Spinner from "../../../Components/Layouts/Spinners/Spinner";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Tooltip from "@mui/material/Tooltip";
import {
  mostrarPunto,
  eliminarPunto,
} from "../../../Redux/Actions/puntos.action";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import imagenWarningProductos from "../../../Components/Assets/Images/advertencia.png";

const Puntos = ({
  mostrarPunto,
  eliminarPunto,
  punto: { puntos, loading },
}) => {
  useEffect(() => {
    mostrarPunto();
  }, []);

  const MySwal = withReactContent(Swal);

  const buttonDelete = (id) => {
    return MySwal.fire({
      title: "¿Quieres eliminar este producto?",
      imageUrl: imagenWarningProductos,
      imageWidth: 100,
      imageHeight: 100,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPunto(id);
        Swal.fire("Eliminado!", "El archivo fue eliminado.", "success").then(
          (resultClose) => {
            //console.log(resultClose)
            mostrarPunto();
          }
        );
      }
    });
  };

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          {loading ? (
            <Spinner />
          ) : (
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card shadow">
                <div class="card-body">
                  <h4 class="card-title">
                    Puntos
                    <div className="float-right">
                      <Link to="/agregar-punto">
                        <Tooltip title="Agregar Nuevo..." className="">
                          <AddBusinessIcon>
                            <AddCircleIcon style={{ color: "#78ae62" }} />
                          </AddBusinessIcon>
                        </Tooltip>
                      </Link>
                    </div>
                  </h4>

                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead class="table-blue">
                        <tr Align="center">
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Departamento</th>
                          <th>Barrio</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {puntos?.length > 0 ? (
                          <>
                            {puntos?.map((punto) => {
                              //console.log(producto)
                              return (
                                <tr Align="center">
                                  <td class="py-1">
                                    <img
                                      src="src\Components\Assets\Images\punto-de-alfiler.png"
                                      alt="image"
                                    />
                                  </td>
                                  <td>{punto?.nombre}</td>
                                  <td>{punto?.departamento}</td>
                                  <td>{punto?.barrio}</td>
                                  <td>
                                    <Link to={`/verPunto/${punto?.uid}`}>
                                      <button
                                        type="button"
                                        class="btn btn-inverse-success btn-icon"
                                      >
                                        <i class="ti-eye"></i>
                                      </button>
                                    </Link>
                                    <Link to={`/editarPunto/${punto?.uid}`}>
                                      <button
                                        type="button"
                                        class="btn btn-inverse-warning btn-icon mx-2"
                                      >
                                        <i class="ti-pencil"></i>
                                      </button>
                                    </Link>
                                    <button
                                      type="button"
                                      class="btn btn-inverse-danger btn-icon"
                                      onClick={() => {
                                        buttonDelete(punto?.uid);
                                      }}
                                    >
                                      <i class="ti-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : (
                          <Spinner Align="center" />
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
       
      </div>



    </Container>
    
  );
};

Puntos.propTypes = {
  mostrarPunto: PropTypes.func.isRequired,
  puntos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  punto: state.puntosReducer,
});

export default connect(mapStateToProps, { mostrarPunto, eliminarPunto })(
  Puntos
);
