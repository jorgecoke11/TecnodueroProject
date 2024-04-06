import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputRobotPrecios from './RobotPrecios';
import DropDownComponent from './DropDown';
import atras from '../img/hacia-atras.png'
import Cupones from './Cupones';
const RobotPrecios = () =>{
    const [screenComponent, setScreenComponent] = useState(null)
    const optionsRobots =['Robot precios']
    const handleSelectChange = (selectOption) =>{
        switch(selectOption){
          case 'Robot precios':
            setScreenComponent(<Cupones></Cupones>)
            break
          default:
            setScreenComponent('')
        }
      }
      const handleAtras = () =>{
        
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