import React, { useState, useEffect } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import { useForm } from "../../../../Components/Hooks/UseForm";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchRegistroProducto } from "../../../../Redux/Actions/productos.action";

import getDistribuidores from "../../../../Redux/Actions/distribuidores.action";
import { width } from "@mui/system";
import { BorderColor } from "@mui/icons-material";

const RegistroDeProductos = ({
  fetchRegistroProducto,

  getDistribuidores,
  distribuidor: { distribuidores },
}) => {
  const [formRegisterValues, handleRegisterInputChange, reset] = useForm({
    nombre: "",
    distribuidor: "",
    unidad: "",
    descripcion: "",
    precio: "",
  });
  let { nombre, distribuidor, unidad, descripcion, precio } =
    formRegisterValues;

  const handleRegister = (e) => {
    e.preventDefault();
    fetchRegistroProducto(nombre, distribuidor, unidad, descripcion, precio);
    reset();
  };

  useEffect(() => {
    getDistribuidores();
  }, []);

  return (
    <Container>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className=" container-fluid  ">
            <div className="row justify-content-center ">
              <div>
                <div className="card shadow-lg ">
                  <div className="row  mx-auto justify-content-center text-center">
                    <div className="col-12 mt-3 ">
                      <br />
                      <h2 className="card-title space">
                        AGREGAR NUEVO PRODUCTO
                        <img
                          src="src\Components\Assets\Images\entregar.png"
                          alt="image"
                          style={{
                            width: "8vh",
                            position: "relative",
                            top: "-3vh",
                          }}
                        />
                      </h2>
                      <hr />
                    </div>
                  </div>
                  <form onSubmit={handleRegister}>
                    <div className="row justify-content-around">
                      <div className="col-md-5">
                        <div className="card border-0">
                          <div className="card-header pb-0"></div>
                          <div className="card-body">
                            <div class="form-group">
                              <label for="exampleInputEmail1">Nombre</label>
                              <input
                                type="text"
                                class="form-control"
                                name="nombre"
                                value={nombre}
                                onChange={handleRegisterInputChange}
                              />
                            </div>

                            <div class="form-group">
                              <label for="exampleInputPassword1">Precio</label>
                              <input
                                type="text"
                                class="form-control"
                                name="precio"
                                value={precio}
                                onChange={handleRegisterInputChange}
                              />
                            </div>

                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Descripcion
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                name="descripcion"
                                value={descripcion}
                                onChange={handleRegisterInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="card border-0 ">
                          <div className="card-header card-2">
                            <div class="form-group">
                              <select
                                class="form-select form-select mx-4 mb-5"
                                aria-label="Default select example"
                                style={{
                                  width: "400px",
                                  top: "10px",
                                  position: "relative",
                                }}
                                name="distribuidor"
                                value={distribuidor}
                                onChange={handleRegisterInputChange}
                              >
                                <option>Selecciona una Distribuidor</option>
                                {distribuidores.map((item) => (
                                  <option key={item.uid} value={item.uid}>
                                    {item.nombre}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <select
                              className="form-select form-select mx-4 mb-5 "
                              aria-label="Default select example"
                              style={{
                                width: "400px",
                                top: "10px",
                                position: "relative",
                              }}
                              name="unidad"
                              value={unidad}
                              onChange={handleRegisterInputChange}
                            >
                              <option>Selecciona un Unidad</option>
                              <option value="Unidad">Unidad</option>
                              <option value="Kilos">Kilos</option>
                              <option value="Docena">Docena</option>
                            </select>
                          </div>

                          <div className="card-body pt-5">
                            <div className="row mb-5 mt-5 mx-5 ">
                              <button type="submit" class="btn btn-primary">
                                Enviar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  data: state.productosReducer.productos,
  distribuidor: state.distribuidor,
});

export default connect(mapStateToProps, {
  fetchRegistroProducto,
  getDistribuidores,
})(RegistroDeProductos);
