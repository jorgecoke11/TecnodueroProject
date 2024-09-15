import React from "react";
import atras from '../../img/hacia-atras.png';
import Ejecuciones from "./Ejecuciones.jsx";
import { useParams } from 'react-router-dom';
import Trazas from "./Trazas.jsx";

const EjecucionMonitorizacion = () =>{
    const { id_caso_fk} = useParams(); 
    const handleAtras = () => {
        window.location = '/Monitorizacion'
    }
    return(
        <>
            <div className="container">
                {console.log(id_caso_fk)}
                <img src={atras}  className='atras' onClick={handleAtras}></img>
                <Trazas id_caso_fk={id_caso_fk}></Trazas> 
                <Ejecuciones id_caso_fk={id_caso_fk}></Ejecuciones>
            </div>
        </>
    )
}
export default EjecucionMonitorizacion