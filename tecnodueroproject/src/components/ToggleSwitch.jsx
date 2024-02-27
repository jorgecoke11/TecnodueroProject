import React, { useState, useEffect} from 'react';
import robotPrecios from '../services/robotPrecios';
function ToggleSwitch(idRobot) {
  // Definir el estado inicial del conmutador
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    loadInitialToggleState();
  }, [])
  const loadInitialToggleState = async () => {
    try {
        const respuesta = await robotPrecios.getConmutador({idRobot:1})
        if(respuesta.conmutador == 1){
            setIsOn(true)
        }else{
            setIsOn(false)
        }
    } catch (error) {
      console.error('Error al cargar el estado del conmutador:', error);
    }
  };
  // Función para manejar el cambio de estado del conmutador
  const handleToggle = () => {
    setIsOn(!isOn); // Cambiar el estado opuesto al estado actual
    if(isOn){
        conmutar(0)
    }else{
        conmutar(1)
    }
  };
  const conmutar = async(conmutador)=>{
    try{
        const respuesta = await robotPrecios.conmutarRobot({conmutador, idRobot:1 })
    }catch(exc){

    }
  }
  return (
    <div>
      {/* Mostrar el estado actual del conmutador */}
      <p>El conmutador está {isOn ? 'encendido' : 'apagado'}</p>
      {/* Renderizar el conmutador */}
      <label>
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span>{isOn ? 'Encendido' : 'Apagado'}</span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
