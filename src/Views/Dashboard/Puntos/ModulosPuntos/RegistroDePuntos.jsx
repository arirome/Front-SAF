import React, { useState, useEffect } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import { useForm } from "../../../../Components/Hooks/UseForm";
import { fetchRegistroPunto } from "../../../../Redux/Actions/puntos.action";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const RegistroDePuntos = ({ fetchRegistroPunto }) => {
  const [formRegisterValues, handleRegisterInputChange, reset] = useForm({
    nombre: "",
    departamento: "",
    barrio: "",
    descripcion: "",
  });

  let { nombre, departamento, barrio, descripcion } = formRegisterValues;

  const handleRegister = (e) => {
    e.preventDefault();
    fetchRegistroPunto(nombre, departamento, barrio, descripcion);
    reset();
  };

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
                        AGREGAR NUEVO PUNTO
                        <img
                          src="src\Components\Assets\Images\agregar-direccion.png"
                          alt="image"
                          style={{
                            width: "8vh",
                            position: "relative",
                            top: "-1vh",
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
                          <div className="card-header card-2 pb-0"></div>
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
                              <label for="exampleInputEmail1">
                                Seleccione un Departamento
                              </label>
                              <select
                                className="form-select form-select mx-4 mb-5 "
                                aria-label="Default select example"
                                style={{
                                  width: "400px",
                                  top: "10px",
                                  position: "relative",
                                }}
                                name="departamento"
                                value={departamento}
                                onChange={handleRegisterInputChange}
                              >
                                <option>{departamento}</option>
                                <option value="Bermejo">Bermejo</option>
                                <option value="Formosa">Formosa</option>
                                <option value="Laishí">Laishí</option>
                                <option value="Matacos">Matacos</option>
                                <option value="Patiño">Patiño</option>
                                <option value="Pilagás">Pilagás</option>
                                <option value="Pilcomayo">Pilcomayo</option>
                                <option value="Pirané">Pirané</option>
                                <option value="Ramón Lista">Ramón Lista</option>
                              </select>
                            </div>

                            <div class="form-group">
                              <label for="exampleInputEmail1">Barrio</label>
                              <input
                                type="text"
                                class="form-control"
                                name="barrio"
                                value={barrio}
                                onChange={handleRegisterInputChange}
                              />
                            </div>
                          </div>

                          <div className="card-body pt-5">
                            <div className="row mb-1 mt-1 mx-5 ">
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

RegistroDePuntos.propTypes = {
  crearPunto: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.puntosReducer.puntos,
});

export default connect(mapStateToProps, { fetchRegistroPunto })(
  RegistroDePuntos
);
