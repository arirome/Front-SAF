import React, { useEffect, useState } from "react";
import Container from "../../../../Components/Layouts/Container/Container";
import Footer from "../../../../Components/Layouts/Footers/Footer";
import "./Style Inventario/AgregarInventario.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { crearInventario, limpiarInventario } from "../../../../Redux/Actions/inventario.action";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { Link, Redirect, useHistory } from "react-router-dom";

const AgregarInventario = ({ crearInventario, limpiarInventario }) => {

  const [cantidadList, setCantidadList] = useState([
    {
      nombre: "Test",
      unidad: "KG",
      cantidadProducto: 20,
      precio: 100,
      destino: "635ab7536abc9ecc0518bf37",
      img: "https://images.vexels.com/media/users/3/199820/isolated/preview/892bfdfcb80b356c53405aafbb716513-caja-de-carton-isometrica.png",
    },
  ]);

  const [inventarioEnviado, setInventarioEnviado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [destino, setDestino] = useState("");
  const [imgProducto, setImgProducto] = useState(
    "https://images.vexels.com/media/users/3/199820/isolated/preview/892bfdfcb80b356c53405aafbb716513-caja-de-carton-isometrica.png"
  );
  const [sumarTotal, setSumarTotal] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombreProducto") {
      setNombre(value);
    } else if (name === "unidadProducto") {
      setUnidad(value);
    } else if (name === "cantidadProducto") {
      setCantidadProducto(value);
    } else if (name === "precioProducto") {
      setPrecio(value);
    } else if (name === "destinoProducto") {
      setDestino("635ab7536abc9ecc0518bf37");
    }
  };

  const handleAdd = () => {
    //console.log(formulario.current)
    setCantidadList([
      ...cantidadList,
      {
        nombre: nombre,
        unidad: unidad,
        cantidadProducto: cantidadProducto,
        precio: precio,
        destino: destino,
        img: imgProducto,
      },
    ]);
    setSumarTotal(sumarTotal + parseInt(precio));
    /* setCantidadList([...cantidadList, { nombre: "", apellido: "" }]); */
  };

  const handleEliminar = (index) => {
    const list = [...cantidadList];
    setSumarTotal(sumarTotal - parseInt(list[index].precio));
    list.splice(index, 1);
    setCantidadList(list);
  };

  //const history = useHistory()
  
  useEffect(() => {
    console.log(cantidadList);
  }, [cantidadList]);

  const confirmarStock = () => {
    crearInventario({
      productos: cantidadList,
    });
    //history.goBack()
  };

 /*  useEffect(()=>{
    limpiarInventario()
  },[]) */

 
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
                      <h2 className="card-title space">
                        AGREGAR NUEVO INVENTARIO
                      </h2>
                    </div>
                  </div>

                  <div className="row justify-content-around">
                    <div className="col-md-5">
                      <div className="card border-0">
                        <div className="card-header pb-0">
                          <h2 className="card-title space ">
                            <Link to="/inventario">
                              <button
                                type="button"
                                class="btn btn-inverse-success btn-icon"
                              >
                                <i class="ti-arrow-left"></i>
                              </button>
                            </Link>{" "}
                            Nuevo Producto
                          </h2>
                          <p className="card-text text-muted mt-4  space">
                            Formulario Del Producto
                          </p>
                          <hr className="my-0" />
                        </div>
                        <div className="card-body">
                          {/*  <div className="row justify-content-between">
                                                        <div className="col-auto mt-0"><p><b>BBBootstrap Team Vasant Vihar  110020 New Delhi India</b></p></div>
                                                        <div className="col-auto"><p><b>BBBootstrap@gmail.com</b> </p></div>
                                                    </div> */}
                          {/*  <div className="row mt-4">
                                                        <div className="col"><p className="text-muted mb-2">PAYMENT DETAILS</p><hr className="mt-0" /></div>
                                                    </div> */}
                          <div className="form-group">
                            <label
                              for="nombreProducto"
                              className="small text-muted mb-1"
                            >
                              Nombre Del Producto
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              name="nombreProducto"
                              id="nombreProducto"
                              aria-describedby="helpId"
                              placeholder="Ej. Manzana"
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                          <div className="row no-gutters">
                            <div className="col-sm-6 pr-sm-2">
                              <div className="form-group">
                                <label
                                  for="unidadProducto"
                                  className="small text-muted mb-1"
                                >
                                  Unidad Del Producto
                                </label>
                                {/* <input type="text" className="form-control form-control-sm" name="NAME" id="NAME" aria-describedby="helpId" placeholder="06/21" /> */}
                                <select
                                  className="form-control form-control-sm"
                                  name="unidadProducto"
                                  onChange={(e) => handleChange(e)}
                                >
                                  <option>Seleccionar unidad</option>
                                  <option>KG</option>
                                  <option>Litros</option>
                                  <option>UN</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label
                                  for="cantidadProducto"
                                  className="small text-muted mb-1"
                                >
                                  Cantidad Total Del Producto
                                </label>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  id="cantidadProducto"
                                  aria-describedby="helpId"
                                  placeholder="Ej. 120"
                                  name="cantidadProducto"
                                  onChange={(e) => handleChange(e)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row no-gutters">
                            <div className="col-sm-6 pr-sm-2">
                              <div className="form-group">
                                <label
                                  for="precioProducto"
                                  className="small text-muted mb-1"
                                >
                                  Precio Total
                                </label>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  name="precioProducto"
                                  onChange={(e) => handleChange(e)}
                                  id="precioProducto"
                                  aria-describedby="helpId"
                                  placeholder="Ej. 3000"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label
                                  for="destinoProducto"
                                  className="small text-muted mb-1"
                                >
                                  Destino
                                </label>
                                <select
                                  className="form-control form-control-sm"
                                  name="destinoProducto"
                                  onChange={(e) => handleChange(e)}
                                >
                                  <option>Seleccionar Destino</option>
                                  <option>Localidad 1</option>
                                  <option>Localidad 2</option>
                                  <option>Localidad 3</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-md-5">
                            <div className="col mx-5">
                              <button
                                type="button"
                                name=""
                                id=""
                                className="btn btn-info"
                                onClick={() => {
                                  handleAdd();
                                }}
                              >
                                Agregar a la lista
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="card border-0 ">
                        <div className="card-header card-2">
                          <p className="card-text text-muted mt-md-4  mb-2 space">
                            Tus Productos a enviar{" "}
                          </p>
                          <hr className="my-2" />
                        </div>
                        <div className="card-body pt-0">
                          {cantidadList.length > 0 ? (
                            <>
                              {cantidadList.map((data, i) => {
                                return (
                                  <React.Fragment key={i}>
                                    <div className="row  justify-content-between">
                                      <div className="col-auto col-md-7">
                                        <div className="media flex-column flex-sm-row">
                                          <img
                                            className=" img-fluid"
                                            src={data.img}
                                            width="62"
                                            height="62"
                                          />
                                          <div className="media-body  my-auto">
                                            <div className="row ">
                                              <div className="col-auto">
                                                <p className="mb-0">
                                                  <b>{data.nombre}</b>
                                                </p>
                                                <small className="text-muted">
                                                  {data.cantidadProducto}{" "}
                                                  {data.unidad}
                                                </small>
                                                <br />
                                                <small className="text-muted">
                                                  Destino: {data.destino}
                                                </small>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className=" pl-0 flex-sm-col col-auto  my-auto">
                                        {" "}
                                        <p className="boxed-1">
                                          ${data.precio}
                                        </p>
                                      </div>
                                      <div className=" pl-0 flex-sm-col col-auto  my-auto ">
                                        <Tooltip title="Eliminar" className="">
                                          <IconButton>
                                            <DeleteIcon
                                              style={{ color: "red" }}
                                              onClick={() => {
                                                handleEliminar(i);
                                              }}
                                            />
                                          </IconButton>
                                        </Tooltip>
                                      </div>
                                    </div>
                                    <hr className="my-2" />
                                  </React.Fragment>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <React.Fragment>
                                <div className="row  justify-content-between">
                                  <div className="col-auto col-md-7">
                                    <div className="media flex-column flex-sm-row">
                                      <img
                                        className=" img-fluid"
                                        src="https://cdn-icons-png.flaticon.com/512/6836/6836858.png"
                                        width="62"
                                        height="62"
                                      />
                                      <div className="media-body  my-auto">
                                        <div className="row ">
                                          <div className="col-auto">
                                            <p className="mb-0">
                                              <b>Pruducto</b>
                                            </p>
                                            <small className="text-muted">
                                              100 KG
                                            </small>
                                            <br />
                                            <small className="text-muted">
                                              Destino: 635ab7536abc9ecc0518bf37
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" pl-0 flex-sm-col col-auto  my-auto">
                                    {" "}
                                    <p className="boxed-1">$0,00</p>
                                  </div>
                                  <div className=" pl-0 flex-sm-col col-auto  my-auto ">
                                    <Tooltip title="Eliminar" className="">
                                      <IconButton>
                                        <DeleteIcon
                                          style={{ color: "white" }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                </div>
                                <hr className="my-2" />
                              </React.Fragment>
                            </>
                          )}
                          <div className="row ">
                            <div className="col">
                              <div className="row justify-content-between">
                                <div className="col-4">
                                  <p className="mb-1">
                                    <b>Total:</b>
                                  </p>
                                </div>
                                <div className="flex-sm-col col-auto">
                                  <p className="mb-1">
                                    <b>
                                      ${" "}
                                      {cantidadList.length > 0
                                        ? sumarTotal
                                        : "0,00"}
                                    </b>
                                  </p>
                                </div>
                              </div>
                              {/*   <div className="row justify-content-between">
                                                                <div className="col"><p className="mb-1"><b>Shipping</b></p></div>
                                                                <div className="flex-sm-col col-auto"><p className="mb-1"><b>0 SEK</b></p></div>
                                                            </div>
                                                            <div className="row justify-content-between">
                                                                <div className="col-4"><p ><b>Total</b></p></div>
                                                                <div className="flex-sm-col col-auto"><p className="mb-1"><b>537 SEK</b></p> </div>
                                                            </div> */}
                              <hr className="my-0" />
                            </div>
                          </div>
                          <div className="row mb-5 mt-4 ">
                            <div className="mx-auto">
                              {cantidadList.length > 0 ? (
                               <button
                               type="button"
                               className="btn btn-success"
                               onClick={() => {
                                 confirmarStock();
                               }}
                             >
                               Guardar y Enviar
                             </button>
                              ) : (
                                <button
                                  type="button"
                                  disabled
                                  className="btn btn-success"
                                
                                >
                                  Guardar y Enviar
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

AgregarInventario.propTypes = {
  crearInventario: PropTypes.func.isRequired,
  limpiarInventario: PropTypes.func.isRequired,
};

export default connect(null, { crearInventario, limpiarInventario })(AgregarInventario);
