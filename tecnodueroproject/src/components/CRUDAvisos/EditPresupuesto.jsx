import React, {useEffect, useState} from "react";
import InputComponent from "../InputComponent";
import avisosServices from '../../services/aviso'
import useUser from "../../hooks/useUser.js";
const EditPresupuesto = ({presupuestoActual, idAviso ,handleClose}) =>{
    const [presupuesto, setPresupuesto] = useState('')
    const { jwt } = useUser();
    const handlePresupuesto = (presupuesto) => {
        const numberRegex = /^-?\d*\.?\d*$/;
        if (numberRegex.test(presupuesto)) {
            setPresupuesto(presupuesto)
        }
    }
    const handleClick = async() =>{
        try{
            const response = await avisosServices.updateAviso(jwt, {
                nuevosDatos:{
                    presupuesto
                },
                criterio:{
                    id: idAviso
                }
            })
            handleClose()
            window.location.reload()
        }catch(error){

        }
    }
    useEffect(()=>{
        setPresupuesto(presupuestoActual)
    },[])
    return(
        <>
        <div className="container">
        <div className="container row"> 
                <InputComponent text={presupuesto} placeHolder='Presupuesto' setInputText={handlePresupuesto} ></InputComponent>
                <button className="btn btn-primary mt-3" onClick={handleClick}>Editar presupuesto</button>
            </div>
        </div>
        </>
    )
}
export default EditPresupuesto