import React, { useState, useEffect } from "react";
import MonitorizacionRobotPrecios from "./MonitorizacionRobotPrecios";

import DropDownComponent from './DropDown';
const Monitorizacion = () =>{
    const [screenComponent, setScreenComponent] = useState(null)
    const optionsRobots =['Robot precios']
    const handleSelectChange = (selectOption) =>{
        switch(selectOption){
          case 'Robot precios':
            setScreenComponent(<MonitorizacionRobotPrecios></MonitorizacionRobotPrecios>)
            break
          default:
            setScreenComponent('')
        }
      }
    return(
        <div>
            <DropDownComponent label={'Robots'} options={optionsRobots} onSelectChange={handleSelectChange}/>
            {screenComponent}
        </div>
    )
}
export default Monitorizacion