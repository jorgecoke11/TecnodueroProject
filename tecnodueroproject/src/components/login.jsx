import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Notification from './Notification'
import useUser from '../hooks/useUser';
const Login = () => {
    const {isLoginLoading, hasLoginError, isLogged,login} = useUser()
    const [username, setUsername] = useState('');
    const [passWord, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = async (event) => {
        try {
         event.preventDefault();
          login({username, passWord})
        } catch (e) {
          console.log(e)

        }
      };
    return(
        <div className='h-75 d-flex justify-content-center align-items-center'>
            <div className='row border '>
                <div className='d-flex justify-content-center align-items-center '>
                <img
                src="img/tecnoduero-cl.png"
                alt="Descripción de la imagen" 
                className="logo-tecnoduero "></img>
                
                    <form onSubmit={handleLogin} className='row border-start '>
                    <h2>Iniciar sesión</h2>
                    {isLoginLoading && <strong> Comprobando creedenciales...</strong>}
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
                    
            {hasLoginError && <strong>Credenciales incorrectas</strong>}
                </div>
            </div>
        </div>
        //HOMEPAGE
    )
}
export default Login