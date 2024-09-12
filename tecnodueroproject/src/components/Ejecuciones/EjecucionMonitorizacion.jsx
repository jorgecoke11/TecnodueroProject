import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser.js";
import atras from '../../img/hacia-atras.png';
import trazasServices from '../../services/traza.js'
import Dropdown from "../Desplegable.jsx";
import Ejecuciones from "./Ejecuciones.jsx";
import { useParams } from 'react-router-dom';

const EjecucionMonitorizacion = () =>{
    const { id_caso_fk} = useParams(); 
    const handleAtras = () => {
        window.location = '/Monitorizacion'
    }
    return(
        <>
            <div className="container">
                <img src={atras} onClick={handleAtras}></img>
                <Ejecuciones id_caso_fk={id_caso_fk}></Ejecuciones>
            </div>
        </>
    )
}
export default EjecucionMonitorizacion