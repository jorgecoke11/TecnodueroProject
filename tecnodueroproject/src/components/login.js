import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
    const [username, setUsername] = useState('');
    const [passWord, setPassword] = useState('');

    const handleLogin = () => {
        axios.get(`http://localhost:8000/usuarios/username/${username}`)
            .then(function (response) {
            const datosUsuario = response.data;
            if(datosUsuario.password === passWord){
                console.log("Login correcto")
                axios.post(`http://localhost:8000/usuarios/cookie/${datosUsuario}`).then(function(response){
                    console.log(response.data)
                })
                console.log(response.data);
            }
            else{
                console.log("creedenciales incorrectas")
            }
          
        })
            .catch(function (error) {
          // Maneja los errores de la solicitud aquí
          console.error('Login incorrecto:', error);
        });
    console.log(`Username: ${username}, Password: ${passWord}`);
    }
    return(
        <div className='h-75 d-flex justify-content-center align-items-center'>
            <div className='row border '>
                <div className='d-flex justify-content-center align-items-center '>
                <img
                src="img/tecnoduero-cl.png"
                alt="Descripción de la imagen" 
                className="logo-tecnoduero "></img>
                
                    <form className='row border-start '>
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
    )
}
export default Login