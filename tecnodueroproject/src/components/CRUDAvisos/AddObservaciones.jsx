import React, { useState, useEffect } from "react";
import avisosServices from '../../services/aviso'
import useUser from "../../hooks/useUser.js";
import Swal from "sweetalert2";
import utils from "../../services/utils.js";
const AddObservacion = ({idAviso, tituloAviso, handleClose, observacionActual, getPendientes}) => {
    const [observacion, setObservacion] = useState('')
    const { jwt,username } = useUser();
    const handleAddObservacion = (event) => {
        setObservacion(event.target.value)
    }
    const handleClick = () => {
        const now = new Date();
        const formattedDate = now.toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        const observacionFinal = observacionActual + '\n' + '[' + formattedDate +"] " +  username + ": " + observacion 
        try{
           const response = avisosServices.updateAviso(jwt,{
            nuevosDatos:{
                observaciones: observacionFinal
            },
            criterio:{
                id: idAviso
            }
           })
           window.location.reload()
           Swal.fire({
               text: "Observacion añadida",
               icon: "success",
               timer: 4000
            })
            utils.enviarEmail(jwt,{
                to: 'tecnoduero@live.com',
                subject: 'Nuevo observacion en aviso',
                text: 'Nuevo observacion en el aviso con titulo: '+ tituloAviso +'-> http://192.168.1.3:81'
            })
            getPendientes()
            handleClose()
        }catch(error){

        }

    }
    return (
        <>
            <div className="container row"> 
                <textarea placeholder="Nueva observacion" onChange={handleAddObservacion} className="form-control mt-3"></textarea>
                <button className="btn btn-primary mt-3" onClick={handleClick}>Añadir observacion</button>
            </div>
        </>
    )
}
export default AddObservacion