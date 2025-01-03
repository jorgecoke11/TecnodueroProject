import React from 'react';
import './App.css';
import './2.0/styles/site.css'
import Home from './components/home';
import MainMenu from './components/MainMenu'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monitorizacion from './components/Monitorizacion';
import { UserContextProvider } from './context/UserContext';
import Direcciones from './components/CRUDDirecciones/Direcciones';
import Avisos from './components/CRUDAvisos/Avisos';
import EjecucionMonitorizacion from './components/Ejecuciones/EjecucionMonitorizacion';
import "bootstrap-icons/font/bootstrap-icons.css";
import ClientesViewModel from './2.0/components/Crud/ViewModels/Clientes/ClientesViewModel';
import ClientesFormCurd from './2.0/components/Crud/Contoller/ClientesFormCrud'
import ProcesosViewModel from './2.0/components/Crud/ViewModels/Procesos/ProcesosViewModel';
import ProcesosView from './2.0/components/Views/ProcessView';
import EjecutablesFormCrud from './2.0/components/Crud/Contoller/EjecutablesFormCrud';
import ProcesosFormCrud from './2.0/components/Crud/Contoller/ProcesosFormCrud';
import ParametrosFormCrud from './2.0/components/Crud/Contoller/ParametrosFormCrud';
function App() {


  return (
    <UserContextProvider>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}>
            </Route>
            {/*Procesos*/}
            <Route path='/procesos' element={<ProcesosViewModel></ProcesosViewModel>}></Route>
            <Route path='/procesos/edit/:id?' element={<ProcesosFormCrud action="edit"></ProcesosFormCrud>}></Route>
            <Route path='/procesos/delete/:id?' element={<ProcesosFormCrud action="delete"></ProcesosFormCrud>}></Route>
            <Route path='/procesos/create' element={<ProcesosFormCrud action="create"></ProcesosFormCrud>}></Route>
            <Route path='/procesos/configuracion/:tab?/:idRobot' element={<ProcesosView></ProcesosView>}></Route>

            <Route path='/Home' element={<MainMenu></MainMenu>}></Route>
            <Route path='/Monitorizacion' element={<Monitorizacion></Monitorizacion>}></Route>
            {/* <Route path='/clientes' element={<Clientes></Clientes>}></Route> */}
            <Route path='/direcciones' element={<Direcciones></Direcciones>}></Route>
            <Route path='/avisos' element={<Avisos></Avisos>}></Route>
            
            {/*Clientes*/}
            <Route path='/clientes/edit/:id?' element={<ClientesFormCurd action="edit"/>} />
            <Route path='/clientes/delete/:id?' element={<ClientesFormCurd action="delete"/>} />
            <Route path='/clientes/create' element={<ClientesFormCurd action="create"/>} />
            <Route path='/clientes' element={<ClientesViewModel/>} />
            
            {/*Ejecutables*/}
            <Route path='/ejecutables/delete/:id?/:activeTab?/:idProcess?' element={<EjecutablesFormCrud action="delete"/>} />
            <Route path='/ejecutables/edit/:id?/:activeTab?/:idProcess?' element={<EjecutablesFormCrud action="edit"/>} />
            <Route path='/ejecutables/create/:activeTab?/:idProcess?' element={<EjecutablesFormCrud action="create"/>} />
            
            {/*Parámetros*/}
            <Route path='/parametros/delete/:id?/:activeTab?/:idProcess?' element={<ParametrosFormCrud action="delete"/>} />
            <Route path='/parametros/edit/:id?/:activeTab?/:idProcess?' element={<ParametrosFormCrud action="edit"/>} />
            <Route path='/parametros/create' element={<ParametrosFormCrud action="create"/>} />


            <Route path='/Monitorizacion/ejecucion/:id_caso_fk' element={<EjecucionMonitorizacion></EjecucionMonitorizacion>}></Route>
          </Routes>
        </BrowserRouter>        
      </div>
    </UserContextProvider>
  );
}

export default App;
