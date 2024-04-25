import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputRobotPrecios from './RobotPrecios';
import DropDownComponent from './DropDown';
import atras from '../img/hacia-atras.png'
import Cupones from './Cupones';
import ConfigRobots from './ConfigRobots/ConfigRobots';
import procesosServices from '../services/Procesos.js'
import useUser from "../hooks/useUser.js";
const RobotPrecios = () =>{
    const [screenComponent, setScreenComponent] = useState(null)
    const [procesos, setProcesos] = useState([])
    const { jwt } = useUser();
    const handleSelectChange = (selectOption) =>{
        var proceso = procesos.find(proceso => proceso.Nombre === selectOption)
        if(proceso != null && proceso.length != 0){
          setScreenComponent(<ConfigRobots proceso={proceso}></ConfigRobots>)
        }
        
      }
      const handleAtras = () =>{
        window.location= '/'
      }
      const GetProcesos = async() =>{
        try{
          const procesos = await procesosServices.getProcesos(jwt)
          setProcesos(procesos)
  
        }catch(error){
          if (error.response.status === 510) {
            window.sessionStorage.clear();
            window.location = "/";
          }
        }
      }
      useEffect(()=>{
        GetProcesos()
      },[])
    return(
        <div className="h-75 justify-content-center align-items-center">
          <img src={atras} className='atras' onClick={handleAtras} alt='atras'></img>
            <DropDownComponent label={'Robots'} options={procesos.map(proceso=> proceso.Nombre)} onSelectChange={handleSelectChange}/>
            {screenComponent}
        </div>
    )
}
export default RobotPrecios