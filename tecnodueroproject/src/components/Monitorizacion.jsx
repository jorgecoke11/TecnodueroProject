import React, { useState, useEffect } from "react";
import MonitorizacionProceso from "./MonitorizacionProceso"
import DropDownComponent from './DropDown';
import procesosServices from '../services/Procesos.js'
import atras from '../img/hacia-atras.png'
import useUser from "../hooks/useUser.js";
const Monitorizacion = () => {
  const { jwt } = useUser();
  const [screenComponent, setScreenComponent] = useState(null)
  const optionsRobots = ['Extraccion de precios BSH']
  const [procesos, setProcesos] = useState([])
  const handleSelectChange = (selectOption) => {
    console.log(selectOption)
    let procesoElegido = procesos.find(proceso => proceso.Nombre === selectOption)
    setScreenComponent(<MonitorizacionProceso nombreProceso={procesoElegido.Nombre} id_proceso={procesoElegido.idRobot}></MonitorizacionProceso>)

  }
  const handleAtras = () => {
    window.location = '/'
  }
  useEffect(() => {
    GetProcesos()
  }, []);
  const GetProcesos = async () => {
    try {
      const procesos = await procesosServices.getProcesos(jwt)
      setProcesos(procesos)

    } catch (error) {
      if (error.response.status === 510) {
        window.sessionStorage.clear();
        window.location = "/";
      }
    }
  }
    return (
      <div class="mx-auto">
        <img src={atras} className='atras' onClick={handleAtras} alt='atras'></img>
        <DropDownComponent label={'Monitorizacion de Procesos'} options={optionsRobots} onSelectChange={handleSelectChange} />
        {screenComponent}
      </div>
    )
  }

  export default Monitorizacion