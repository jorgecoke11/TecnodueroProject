import React, { useState, useEffect } from "react";
import MonitorizacionProceso from "./MonitorizacionProceso";
import DropDownComponent from './DropDown';
import procesosServices from '../services/Procesos.js';
import atras from '../img/hacia-atras.png';
import useUser from "../hooks/useUser.js";

const Monitorizacion = () => {
  const { jwt } = useUser();
  const [screenComponent, setScreenComponent] = useState(null);
  const [optionsRobots, setOptionsRobot] = useState([]);
  const [procesos, setProcesos] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectOption) => {
    setSelectedOption(selectOption); // Cambiar la opción seleccionada
    let procesoElegido = procesos.find(proceso => proceso.Nombre === selectOption);
    // Forzar una nueva renderización pasando una key única
    setScreenComponent(
      <MonitorizacionProceso 
        key={procesoElegido.idRobot} // Asegurarse de que React lo vea como un componente nuevo
        nombreProceso={procesoElegido.Nombre} 
        id_proceso={procesoElegido.idRobot}
      />
    );
  };

  const handleAtras = () => {
    window.location = '/';
  };

  useEffect(() => {
    GetProcesos();
  }, []);

  const GetProcesos = async () => {
    try {
      const procesos = await procesosServices.getProcesos(jwt);
      setProcesos(procesos);
      const optionsRobots = procesos.map(proceso => proceso.Nombre);
      setOptionsRobot(optionsRobots);
    } catch (error) {
      if (error.response && error.response.status === 510) {
        window.sessionStorage.clear();
        window.location = "/";
      }
    }
  };

  return (
    <div className="mx-auto">
      <img src={atras} className='atras' onClick={handleAtras} alt='atras'></img>
      <DropDownComponent 
        label={'Monitorizacion de Procesos'} 
        options={optionsRobots} 
        onSelectChange={handleSelectChange} 
      />
      {screenComponent}
    </div>
  );
};

export default Monitorizacion;
