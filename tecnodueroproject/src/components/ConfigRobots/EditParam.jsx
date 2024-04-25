import React, {useEffect, useState} from "react";
import parametrosServices from "../../services/parametros.js";
import useUser from "../../hooks/useUser.js";
import InputComponent from "../InputComponent.jsx";
const EditParam =({valor,codigo, onActualizar})=>{
    const [valorActual,setValor] = useState('')
    const { jwt } = useUser();
    useEffect(()=>{
        setValor(valor)
    },[valor])
    const handleInputChange = async(event)=>{
        valor = event.target.value;
  
        console.log(valorActual); // Utiliza el valor actualizado directamente aquí
    }
    const handleClickActualizar = async (codigo,valor)=>{
        try{
          const response = await parametrosServices.updateParametro(jwt,{
            codigo,
            valor
          })
          onActualizar()
        }catch(error){
          if (error.response.status === 510) {
            window.sessionStorage.clear();
            window.location = "/";
          }
        }
      }
    return(
        <>
            <h4>Editar parametro: {codigo}</h4>
            <InputComponent placeholder='Valor' text={valorActual} setInputText={setValor}></InputComponent>
            <button className="btn btn-primary mt-2" onClick={async()=>handleClickActualizar(codigo,valorActual)}>Actualizar</button>
        </>
    )
}
export default EditParam