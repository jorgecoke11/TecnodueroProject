import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputComponent = (props) =>{
    const {placeHolder} = props
    return(
        <div className='container mt-3'>
            <input placeholder={placeHolder} className='form-control'></input>
        </div>
    )
}
export default InputComponent