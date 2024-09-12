import Login from './components/login';
import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/home';
import MainMenu from './components/MainMenu'
import loginService from '../src/services/login';
import sessionData from './js/sessionData';
import Robot from "./components/Robot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monitorizacion from './components/Monitorizacion';
import { UserContextProvider } from './context/UserContext';
import Clientes from './components/CRUDClientes/Clientes';
import Direcciones from './components/CRUDDirecciones/Direcciones';
import Avisos from './components/CRUDAvisos/Avisos';
import EjecucionMonitorizacion from './components/Ejecuciones/EjecucionMonitorizacion';
function App() {
  return (
    <UserContextProvider>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}>
            </Route>
            <Route path='/Robots' element={<Robot></Robot>}></Route>
            <Route path='/Home' element={<MainMenu></MainMenu>}></Route>
            <Route path='/Monitorizacion' element={<Monitorizacion></Monitorizacion>}></Route>
            <Route path='/clientes' element={<Clientes></Clientes>}></Route>
            <Route path='/direcciones' element={<Direcciones></Direcciones>}></Route>
            <Route path='/avisos' element={<Avisos></Avisos>}></Route>
            <Route path='/Monitorizacion/ejecucion/:id_caso_fk' element={<EjecucionMonitorizacion></EjecucionMonitorizacion>}></Route>
          </Routes>
        </BrowserRouter>        
      </div>
    </UserContextProvider>
  );
}

export default App;
