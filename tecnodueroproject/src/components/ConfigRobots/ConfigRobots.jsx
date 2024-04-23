import { React, useEffect, useState } from "react";
import InputComponent from "../InputComponent.jsx";
import ToggleSwitch from "../ToggleSwitch.jsx";
import cuponesCalls from "../../services/cupon.js";
import ModalComponent from "../ModalComponent.jsx";
import robotPrecios from "../../services/robotPrecios.js";
import useUser from "../../hooks/useUser.js";

import Maquinas from "./Maquinas.jsx";


const ConfigRobots = (ejecutable) => {
  const [proveedor, setProveedor] = useState("");
  const [iva, setIva] = useState("");
  const [beneficio, setBeneficio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cupon, setCupon] = useState("");
  const [producto, setProducto] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [cuponBD, setCuponBD] = useState("");
  const { jwt } = useUser();
  const [maquinas, setMaquinas] = useState([]);
  const handleLanzar = async (event) => {
    try {
      event.preventDefault();
      const respuesta = await robotPrecios.lanzarRobot(jwt);
      if (respuesta.message == "Programa ejecutado correctamente.") {
        setModalContent(
          <div>
            <h1>{respuesta.message}</h1>
          </div>
        );
        setShowModal(true);
      }
      console.log(respuesta.message);
    } catch (error) {
      if (error.response.status === 510) {
        window.sessionStorage.clear();
        window.location = "/";
      }
    }
  };
  const CuponUpdate = async () => {
    try {
      const nombre = "bsh";
      const data = await cuponesCalls.updateCupon(jwt, {
        cuponBD,
        nombre,
      });
    } catch (error) {
      if (error.response.status === 510) {
        window.sessionStorage.clear();
        window.location = "/";
      }
    }
  };
  const Cupon = async () => {
    try {
      const nombre = "bsh";
      const data = await cuponesCalls.getCupones(jwt, {
        nombre,
      });
      setCuponBD(data);
    } catch (error) {
      if (error.response.status === 510) {
        window.sessionStorage.clear();
        window.location = "/";
      }
    }
  };

  useEffect(() => {
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <Maquinas nombre={ejecutable}></Maquinas>
          <div className="col">
            <InputComponent
              placeholder="Cupon"
              setInputText={setCuponBD}
              text={cuponBD.cupon}
            ></InputComponent>
          </div>
          <div className="col">
            <button className="btn btn-primary mt-3" onClick={CuponUpdate}>
              Actualizar
            </button>
          </div>
        </div>
      </div>
      <ToggleSwitch idRobot="1"></ToggleSwitch>
      <button type="submit" className="btn btn-primary" onClick={handleLanzar}>
        Lanzar
      </button>
      <ModalComponent isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalContent}
      </ModalComponent>
    </div>
  );
};
export default ConfigRobots;
