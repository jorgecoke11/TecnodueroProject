import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputComponent = (props) =>{
    const {placeHolder, setInputText} = props
    const handleInputChange = (event)=>{
        setInputText(event.target.value);
    }
    return(
        <div className='container mt-3'>
            <input 
                placeholder={placeHolder} 
                className='form-control'
                onChange={handleInputChange}
                >
            </input>
        </div>
    )
}
export default InputComponent