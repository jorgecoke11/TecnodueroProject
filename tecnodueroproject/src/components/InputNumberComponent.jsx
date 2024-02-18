import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputNumberComponent = (props) =>{
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
                type='number'
                >
            </input>
        </div>
    )
}
export default InputNumberComponent