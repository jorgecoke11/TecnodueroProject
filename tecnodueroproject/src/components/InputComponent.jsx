import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputComponent = (props) => {
    const { placeHolder, setInputText, text, ...other } = props; // Capturar todas las propiedades adicionales
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    }
    return (
        <div className='container mt-3'>
            <input
                placeholder={placeHolder}
                className='form-control'
                onChange={handleInputChange}
                value={text}
                {...other} // Pasar todas las propiedades adicionales al input
            />
        </div>
    )
}
export default InputComponent;
