import React, { useState} from "react";
import { Link } from 'react-router-dom';
const MainMenu = () =>{
    const [componenteActual, setComponenteActual] = useState('')
    const handleAvisos = () => {
        setComponenteActual(null);
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