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
import MyDataGrid from './2.0/components/DataTable';
import ReactTable from './2.0/components/ReactTable';
function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id', // Clave del objeto
      },
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Edad',
        accessor: 'edad',
      },
      {
        Header: 'Ciudad',
        accessor: 'ciudad',
      },
    ],
    []
  );
  
  const data = [
    { id: 1, nombre: 'Juan Pérez', edad: 28, ciudad: 'Madrid' },
    { id: 2, nombre: 'Ana Gómez', edad: 34, ciudad: 'Barcelona' },
    { id: 3, nombre: 'Carlos López', edad: 45, ciudad: 'Valencia' },
    { id: 4, nombre: 'Laura Rodríguez', edad: 23, ciudad: 'Sevilla' },
    { id: 5, nombre: 'Pedro Martínez', edad: 37, ciudad: 'Zaragoza' },
    { id: 6, nombre: 'Lucía Fernández', edad: 29, ciudad: 'Bilbao' },
    { id: 7, nombre: 'Alberto Sánchez', edad: 50, ciudad: 'Murcia' },
    { id: 8, nombre: 'Raquel Díaz', edad: 31, ciudad: 'Alicante' },
    { id: 9, nombre: 'David González', edad: 40, ciudad: 'Granada' },
    { id: 10, nombre: 'Marta Pérez', edad: 26, ciudad: 'Palma de Mallorca' },
    { id: 11, nombre: 'Javier González', edad: 33, ciudad: 'Las Palmas' },
    { id: 12, nombre: 'Patricia Gómez', edad: 25, ciudad: 'Vigo' },
    { id: 13, nombre: 'Manuel Fernández', edad: 42, ciudad: 'Santander' },
    { id: 14, nombre: 'Antonio Rodríguez', edad: 55, ciudad: 'Gijón' },
    { id: 15, nombre: 'María García', edad: 27, ciudad: 'Burgos' },
    { id: 16, nombre: 'José Martínez', edad: 39, ciudad: 'Cádiz' },
    { id: 17, nombre: 'Elena Pérez', edad: 30, ciudad: 'Logroño' },
    { id: 18, nombre: 'Álvaro Díaz', edad: 34, ciudad: 'Castellón' }
  ];
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
            <Route path='/prueba' element={<ReactTable columns={columns} data={data}></ReactTable>}></Route> 
            <Route path='/Monitorizacion/ejecucion/:id_caso_fk' element={<EjecucionMonitorizacion></EjecucionMonitorizacion>}></Route>
          </Routes>
        </BrowserRouter>        
      </div>
    </UserContextProvider>
  );
}

export default App;
