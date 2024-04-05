import Login from './components/login';
import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/home';
import MainMenu from './components/MainMenu'
import loginService from '../src/services/login';
import sessionData from './js/sessionData';
import RobotPrecios from "./components/RobotPrecios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monitorizacion from './components/Monitorizacion';
function App() {
  const [username, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(()=>{
    const loggedUserJson = window.localStorage.getItem('loggedAppUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  },[])

  const handleLogOut = () =>{
    setUser('')
    window.localStorage.removeItem('loggedAppUser')
  }
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const usuario = await loginService.login({
        username,
        passWord
      });
      console.log(usuario)
      sessionData.setToken(usuario.token)
      setUser(usuario);
      console.log(user);
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(usuario)
      )
      window.location.reload()
      // setUsername('');
      // setPassword('');
    } catch (e) {
      console.log(e)
      setErrorMessage('Credenciales incorrectas');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Home user={user}/> : <Login handleLogin={handleLogin} setPassword={setPassword} setUsername={setUsername} passWord={passWord} username={username} errorMessage={errorMessage} />}>
          </Route>
          <Route path='/Robots' element={<RobotPrecios></RobotPrecios>}></Route>
          <Route path='/Home' element={<MainMenu></MainMenu>}></Route>
          <Route path='/Monitorizacion' element={<Monitorizacion></Monitorizacion>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
