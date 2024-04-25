import { React, useEffect, useState } from "react";
import useUser from "../../hooks/useUser.js";
import maquinasServices from "../../services/maquinas.js";
import robotPrecios from "../../services/robotPrecios.js";
import procesosServices from '../../services/Procesos.js'
import switchImg from '../../img/power-switch.png'
import Table from 'react-bootstrap/Table';
const Conmutadores =({proceso})=>{
    const { jwt } = useUser();
    const [procesoActual, setProcesoActual] = useState([])
    const handleSwitch = async()=>{
      try{
        if(procesoActual.conmutador === 1){
          await procesosServices.updateConmutador(jwt,{
            idRobot: procesoActual.idRobot,
            conmutador: 0
          })
        }
        else if(procesoActual.conmutador === 0){
          await procesosServices.updateConmutador(jwt,{
            idRobot: procesoActual.idRobot,
            conmutador: 1
          })
        }
        else{
          console.log('conmutador no contemplado')
        }
        var procesoTemp = await procesosServices.getProcesos(jwt,{
          idRobot: procesoActual.idRobot
        })
        setProcesoActual(procesoTemp[0])
        }catch(error){
          if (error.response.status === 510) {
            window.sessionStorage.clear();
            window.location = "/";
          }
          console.log(error)
        }
      }
      const GetConmutadores = async () => {
          try {
            setProcesoActual(proceso)
          } catch (error) {
            if (error.response.status === 510) {
              window.sessionStorage.clear();
              window.location = "/";
            }
          }
      }
      useEffect( () => {
        GetConmutadores()
      }, []);
     
    return(
        <>
        <h3 className="col-1">Proceso:</h3>
            <Table striped> 
              <thead>
                <th>Id #</th>
                <th>Nombre</th>
                <th>Status</th>
                <th>Acciones</th>
              </thead>
              <tbody>
                      <tr>
                        <td>{procesoActual.idRobot}</td>
                        <td>{procesoActual.Nombre}</td>
                        <td> 
                        <div className={procesoActual.conmutador == 1 ? "bordered-cell-on" : "bordered-cell-off"}>
                        {procesoActual.conmutador== 1 ? "ON" : "OFF"}
                        </div>
                        </td>
                        <td>
                            <a onClick={async()=>handleSwitch()}>
                                <img src={switchImg} className="icon-img"></img>
                            </a>
                        </td>
                    </tr>
              </tbody>
            </Table>
    </>
)
}
export default Conmutadores