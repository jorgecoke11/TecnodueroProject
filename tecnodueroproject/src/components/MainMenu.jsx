import React, { useState, useEffect } from "react";
import sessionData from '../js/sessionData'
import RobotPrecios from "./Robot";
import Monitorizacion from "./Monitorizacion";
import { Link } from 'react-router-dom';
const MainMenu = (user) =>{
    const [componenteActual, setComponenteActual] = useState('')
    const handleAvisos = () => {
        setComponenteActual(null);
      };
    const handleMonitorizacion = () =>{
      setComponenteActual(()=>{return(
        <div>
            <Monitorizacion></Monitorizacion>
        </div>
        )}); 
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
          <Link to="/robots" className="btn btn-primary mb-3">Robots</Link>
          <Link className="btn btn-primary" to='/monitorizacion'>Monitorización</Link>
        </div>
      )}
    </div>
    )
}
export default MainMenu