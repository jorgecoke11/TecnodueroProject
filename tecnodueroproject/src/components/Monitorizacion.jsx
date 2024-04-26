import React, { useState, useEffect } from "react";
import MonitorizacionProceso from "./MonitorizacionProceso"
import DropDownComponent from './DropDown';
import atras from '../img/hacia-atras.png'
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
      const handleAtras = () =>{
        window.location= '/'
      }
    return(
      <div class="mx-auto">
          <img src={atras} className='atras' onClick={handleAtras} alt='atras'></img>
            <DropDownComponent label={'Monitorizacion de Procesos'} options={optionsRobots} onSelectChange={handleSelectChange}/>
            {screenComponent}
      </div>
    )
}
export default Monitorizacion