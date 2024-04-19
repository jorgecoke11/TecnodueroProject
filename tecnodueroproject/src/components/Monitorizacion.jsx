import React, { useState, useEffect } from "react";
import MonitorizacionRobotPrecios from "./MonitorizacionRobotPrecios";
import MonitorizacionProceso from "./MonitorizacionProceso"
import DropDownComponent from './DropDown';
const Monitorizacion = () =>{
    const [screenComponent, setScreenComponent] = useState(null)
    const optionsRobots =['Extraccion de precios BSH']
    const handleSelectChange = (selectOption) =>{
        switch(selectOption){
          case 'Extraccion de precios BSH':
            setScreenComponent(<MonitorizacionProceso nombreProceso={"Extraccion de precios BSH"} id_proceso={1}></MonitorizacionProceso>)
            break
          default:
            setScreenComponent('')
        }
      }
    return(
      <div class="mx-auto">
            <DropDownComponent label={'Robots'} options={optionsRobots} onSelectChange={handleSelectChange}/>
            {screenComponent}
        </div>
    )
}
export default Monitorizacion