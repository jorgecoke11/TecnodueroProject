import Login from './components/login';
import React, { useState } from 'react';
import './App.css';
import Home from './components/home';
import loginService from '../src/services/login';

function App() {
  const [username, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const usuario = await loginService.login({
        username,
        passWord
      });

      setUser(usuario);
      console.log(user);
      // setUsername('');
      // setPassword('');
    } catch (e) {
      setErrorMessage('Credenciales incorrectas');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className='App'>
      {user ? <Home /> : <Login handleLogin={handleLogin} setPassword={setPassword} setUsername={setUsername} passWord={passWord} username={username} errorMessage={errorMessage} />}
    </div>
  );
}

export default App;
