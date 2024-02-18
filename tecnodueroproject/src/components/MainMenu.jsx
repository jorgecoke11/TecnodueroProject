import React, { useState } from "react";
import  DropDownComponent  from './DropDown'
import Button from "./Button";
import RobotPrecios from "./Robot";
const MainMenu = (user) =>{
    const [componenteActual, setComponenteActual] = useState('')
    const optionsRobots = ['Robot precios']
    const handleAvisos = () => {
        setComponenteActual(null);
      };

    const handleRobots = () => {
        // Agrega lógica para el botón "Robots" si es necesario
        setComponenteActual(()=>{return(
            <div>
                <RobotPrecios></RobotPrecios>
            </div>
            )}); 
                            
  
    };
    return (
        <div className="h-75 d-flex justify-content-center align-items-center">
      {componenteActual || (
        <div className="row">
          <button className="btn btn-primary mb-3" onClick={handleAvisos}>Avisos</button>
          <button className="btn btn-primary" onClick={handleRobots}>Robots</button>
        </div>
      )}
    </div>
    )
}
export default MainMenu