import Login from './components/login';
import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/home';
import MainMenu from './components/MainMenu'
import loginService from '../src/services/login';
import sessionData from './js/sessionData';
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
      window.location.reload();
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
      {user ? <Home user={user}/> : <Login handleLogin={handleLogin} setPassword={setPassword} setUsername={setUsername} passWord={passWord} username={username} errorMessage={errorMessage} />}
    </div>
  );
}

export default App;
