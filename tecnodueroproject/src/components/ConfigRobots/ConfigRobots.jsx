import { React, useEffect, useState } from "react";
import InputComponent from "../InputComponent.jsx";
import ToggleSwitch from "../ToggleSwitch.jsx";
import cuponesCalls from "../../services/cupon.js";
import ModalComponent from "../ModalComponent.jsx";
import robotPrecios from "../../services/robotPrecios.js";
import useUser from "../../hooks/useUser.js";
import Ejecutables from "./Ejecutables.jsx";
import Conmutadores from "./Conmutadores.jsx";
import Parametros from "./Parametros.jsx";


const ConfigRobots = ({proceso}) => {
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
    Cupon()
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="mt-2">

          <Ejecutables proceso={proceso}></Ejecutables>
          </div>

          <div className="mt-2">

          <Conmutadores proceso={proceso}></Conmutadores>
          </div>
          <div className="mt-2">
          <Parametros proceso={proceso}></Parametros>

          </div>
        </div>
      </div>

      <ModalComponent isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalContent}
      </ModalComponent>
    </div>
  );
};
export default ConfigRobots;
