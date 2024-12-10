import Login from './components/login';
import React, { useEffect, useState } from 'react';
import './App.css';
import './2.0/styles/site.css'
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
import TestCrud from './2.0/components/Crud/ViewModels/TestCrud/TestCrud';
import DynamicForm from './2.0/components/BaseComponents/DynamicForm';
import "bootstrap-icons/font/bootstrap-icons.css";
import TestFormCrud from './2.0/components/Crud/Contoller/Test/TestFormCrud';
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
            <Route path='/prueba' element={<TestCrud></TestCrud>}></Route> 
            <Route path='/prueba/edit/:id?' element={<TestFormCrud/>} />
            <Route path='/Monitorizacion/ejecucion/:id_caso_fk' element={<EjecucionMonitorizacion></EjecucionMonitorizacion>}></Route>
          </Routes>
        </BrowserRouter>        
      </div>
    </UserContextProvider>
  );
}

export default App;
