import PropTypes from "prop-types";
import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from "../../../Components/Layouts/Container/Container";
import Footer from "../../../Components/Layouts/Footers/Footer";
import Spinner from "../../../Components/Layouts/Spinners/Spinner";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import {
  mostrarProductos,
  eliminarProducto,
} from "../../../Redux/Actions/productos.action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import imagenWarningProductos from "../../../Components/Assets/Images/advertencia.png";

const Productos = ({
  mostrarProductos,
  eliminarProducto,
  producto: { productos, loading },
}) => {
  useEffect(() => {
    mostrarProductos();
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
        eliminarProducto(id);
        Swal.fire("Eliminado!", "El archivo fue eliminado.", "success").then(
          (resultClose) => {
            //console.log(resultClose)
            mostrarProductos();
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
                    Productos
                    <div className="float-right">
                      <Link to="/agregar-producto">
                        <Tooltip title="Agregar Nuevo..." className="">
                          <AddBoxIcon>
                            <AddCircleIcon style={{ color: "#78ae62" }} />
                          </AddBoxIcon>
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
                          <th>Unidad</th>
                          <th>Descripcion</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos?.length > 0 ? (
                          <>
                            {productos?.map((producto) => {
                              //console.log(producto)
                              return (
                                <tr Align="center">
                                  <td class="py-1">
                                    <img
                                      src="src\Components\Assets\Images\orden.png  "
                                      alt="image"
                                    />
                                  </td>
                                  <td className="td">{producto?.nombre}</td>
                                  <td className="td">{producto?.unidad}</td>
                                  <td className="td">
                                    {producto?.descripcion}
                                  </td>
                                  <td>
                                    <Link to={`/verProducto/${producto.uid}`}>
                                      <button
                                        type="button"
                                        class="btn btn-inverse-success btn-icon"
                                      >
                                        <i class="ti-eye"></i>
                                      </button>
                                    </Link>

                                    <Link
                                      to={`/editarProducto/${producto.uid}`}
                                    >
                                      <button
                                        type="button"
                                        class="btn btn-inverse-warning btn-icon mx-2"
                                      >
                                        <i class="ti-pencil"></i>
                                      </button>
                                    </Link>
                                    <button
                                      class="btn btn-inverse-danger btn-icon mx-2"
                                      onClick={() => {
                                        buttonDelete(producto?.uid);
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

Productos.propTypes = {
  mostrarProductos: PropTypes.func.isRequired,
  productos: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  producto: state.productosReducer,
});

export default connect(mapStateToProps, { mostrarProductos, eliminarProducto })(
  Productos
);
