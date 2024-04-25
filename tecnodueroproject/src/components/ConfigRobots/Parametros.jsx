import { React, useEffect, useState } from "react";
import useUser from "../../hooks/useUser.js";
import parametrosServices from "../../services/parametros.js";
import robotPrecios from "../../services/robotPrecios.js";
import ModalComponent from "../ModalComponent.jsx";
import procesosServices from '../../services/Procesos.js'
import switchImg from '../../img/power-switch.png'
import Table from 'react-bootstrap/Table';

import EditParam from "./EditParam.jsx";
const Parametros =({proceso})=>{
    const { jwt } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [parametros, setParametros] = useState([])
    const handleSwitch = async(valor,codigo)=>{
      try{
         setModalContent(
           <EditParam codigo={codigo} valor={valor} onActualizar={async()=>{GetParametros(); setShowModal(false) }}></EditParam>
        )
        setShowModal(true)
      }catch(error){
          console.log(error)
          if (error.response.status === 510) {
            window.sessionStorage.clear();
            window.location = "/";
          }
        }
      }
      const GetParametros = async () => {
          try {
            const data = await parametrosServices.getParametros(jwt,{idRobot: proceso.idRobot})
            setParametros(data)
          } catch (error) {
            if (error.response.status === 510) {
              window.sessionStorage.clear();
              window.location = "/";
            }
          }
      }
      useEffect( () => {
        GetParametros()
      }, []);
     
    return(
        <>
        <h3 className="col-1">Parametros</h3>
              {parametros.length > 0 ? (
            <Table striped> 
              <thead>
                <th>Código</th>
                <th>Valor</th>
                <th>Acciones</th>
              </thead>
              <tbody>
                  {parametros.map((parametro, index) => (
                      <tr key={index}>
                      <td><b>{parametro.codigo}</b></td>
                      <td>{parametro.valor}</td>
                      <td>
                          <a onClick={async()=>handleSwitch(parametro.valor,parametro.codigo)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                          </a>
                      </td>
                  </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
              <strong>No hay parametros</strong>
            )}
            <ModalComponent isOpen={showModal} onClose={() => {
                setShowModal(false)
              }}>
              {modalContent}
            </ModalComponent>
    </>
)
}
export default Parametros