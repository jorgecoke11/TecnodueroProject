import { React, useEffect, useState } from "react";
import useUser from "../../hooks/useUser.js";
import ejecutablesServices from "../../services/ejecutables.js"
import robotPrecios from "../../services/robotPrecios.js";
import switchImg from '../../img/power-switch.png'
import Table from 'react-bootstrap/Table';
const Maquinas =(nombre)=>{
    const { jwt } = useUser();
    const [ejecutables, setEjecutables] = useState([]);
    const [statusBSH, setStatusBSH] = useState(0)
    const handleSwitch = async(id, status)=>{
      try{
        const nuevosDatos = status === 0 ? 1 :0
        const response = await maquinasServices.update(jwt,{
            status:nuevosDatos,
            criterio:id
          })
          await GetMaquinas()
        }catch(error){
          if (error.response.status === 510) {
            window.sessionStorage.clear();
            window.location = "/";
          }
          console.log(error)
        }
      }
      const GetEjecutables = async () => {
          try {
            const data = await ejecutablesServices.getEjecutables(jwt);
            setEjecutables(data);
            const data2 = await robotPrecios.checkRobot(jwt,{nombre:nombre.nombre.ejecutable})
            setStatusBSH(data2.message)
            console.log(statusBSH);
          } catch (error) {
            if (error.response.status === 510) {
              window.sessionStorage.clear();
              window.location = "/";
            }
          }
      }
      useEffect(() => {
        GetMaquinas()
      }, []);
     
    return(
        <>
        <h3 className="col-1">Maquinas</h3>
              {ejecutables.length > 0 ? (
            <Table striped> 
              <thead>
                <th>Maquina</th>
                <th>IP</th>
                <th>Status</th>
                <th>Acciones</th>
              </thead>
              <tbody>
                  {ejecutables.map((ejecutable, index) => (
                      <tr key={index}>
                        <td>{ejecutable.id}</td>
                        <td>{ejecutable.nombre}</td>
                        <td> 
                        <div className={statusBSH == 1 ? "bordered-cell-on" : "bordered-cell-off"}>
                        {statusBSH == 1 ? "ON" : "OFF"}
                        </div>
                        </td>
                        <td>
                            <a onClick={async()=>handleSwitch(ejecutable.id, ejecutable.status)}>
                                <img src={switchImg} className="icon-img"></img>
                            </a>
                        </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
              <strong>No hay maquinas</strong>
            )}
    </>
)
}
export default Maquinas