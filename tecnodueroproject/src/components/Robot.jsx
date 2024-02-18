import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputRobotPrecios from './RobotPrecios';
import DropDownComponent from './DropDown';
const RobotPrecios = () =>{
    const [screenComponent, setScreenComponent] = useState(null)
    const optionsRobots =['Robot precios']
    const handleSelectChange = (selectOption) =>{
      console.log('ola')
        switch(selectOption){
          case 'Robot precios':
            setScreenComponent(<InputRobotPrecios></InputRobotPrecios>)
        }
      }

    return(
        <div className="h-75 justify-content-center align-items-center">
            <DropDownComponent label={'Robots'} options={optionsRobots} onSelectChange={handleSelectChange}/>
            {screenComponent}
        </div>
    )
}
export default RobotPrecios