import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Notification from './Notification'

const Login = ({handleLogin, setPassword, setUsername, errorMessage, username, passWord}) => {
   
    return(
        <div className='h-75 d-flex justify-content-center align-items-center'>
            <Notification message={errorMessage}></Notification>
            <div className='row border '>
                <div className='d-flex justify-content-center align-items-center '>
                <img
                src="img/tecnoduero-cl.png"
                alt="Descripción de la imagen" 
                className="logo-tecnoduero "></img>
                
                    <form onSubmit={handleLogin} className='row border-start '>
                    <h2>Iniciar sesión</h2>
                        <label
                            className='mb-3 mt-3'>
                            Usuario:
                            <input
                                type="email"
                                className='form-control'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                ></input>
                        </label> 
                        <label
                            className='mb-3 mt-3'>
                            Contraseña:
                            <input
                                type = "password"
                                className='form-control'
                                value={passWord}
                                onChange={e => setPassword(e.target.value)}
                                ></input>
                        </label>
                        <br></br>
                        <button 
                        type="button" 
                        onClick={handleLogin}
                        className='btn btn btn-success d-grid gap-2 col-6 mx-auto mb-2'
                        > Acceder
                        </button>
                    </form>
                </div>
            </div>
        </div>
        //HOMEPAGE
    )
}
export default Login