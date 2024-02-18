import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputComponent from './InputComponent';
import Button from './Button';
const InputRobotPrecios = () =>{


    return(
        <div className='container mt-5'>
            <div>
                <label >Proveedor</label>
                <InputComponent placeHolder='Proveedor'></InputComponent>
                <label >IVA</label>
                <InputComponent placeHolder='IVA'></InputComponent>
                <label >Beneficio</label>
                <InputComponent placeHolder='Beneficio'></InputComponent>
                <label >Cupon</label>
                <InputComponent placeHolder='Cupon'></InputComponent>
                <div className='mt-3'>
                    <button type='submit' className='btn btn-primary'>Lanzar</button>
                </div>
            </div>
        </div>    
    )
}
export default InputRobotPrecios