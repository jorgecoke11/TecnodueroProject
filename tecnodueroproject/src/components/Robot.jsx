import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputRobotPrecios from './RobotPrecios';
import DropDownComponent from './DropDown';
import atras from '../img/hacia-atras.png'
import Cupones from './Cupones';
import ConfigRobots from './ConfigRobots/ConfigRobots';
const RobotPrecios = () =>{
    const [screenComponent, setScreenComponent] = useState(null)
    const optionsRobots =['Extraccion de precios BSH']
    const handleSelectChange = (selectOption) =>{
        switch(selectOption){
          case 'Extraccion de precios BSH':
            setScreenComponent(<ConfigRobots ejecutable='Precios2023.exe'></ConfigRobots>)
            break
          default:
            setScreenComponent('')
        }
      }
      const handleAtras = () =>{
        window.location= '/'
      }
    return(
        <div className="h-75 justify-content-center align-items-center">
          <img src={atras} className='atras' onClick={handleAtras} alt='atras'></img>
            <DropDownComponent label={'Robots'} options={optionsRobots} onSelectChange={handleSelectChange}/>
            {screenComponent}
        </div>
    )
}
export default RobotPrecios