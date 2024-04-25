import { React, useEffect, useState } from "react";
import useUser from "../../hooks/useUser.js";
import ejecutablesServices from "../../services/ejecutables.js"
import robotPrecios from "../../services/robotPrecios.js";
import switchImg from '../../img/power-switch.png'
import Table from 'react-bootstrap/Table';
const Ejecutables =({proceso})=>{
    const { jwt } = useUser();
    const [ejecutables, setEjecutables] = useState([]);
    const handleSwitch = async(nombre, ruta)=>{
      try{
        
        var statusTemp = await GetStatus(nombre)
        if(statusTemp == 1){
          const response = await robotPrecios.matarEjecutable(jwt,{
            nombre: nombre
          })
        }else if( statusTemp == 0){
          const response = await robotPrecios.lanzarEjecutable(jwt,{
            nombre: ruta
          })
        }
        else{
          console.log('status no definido')
        }
        await GetEjecutables()
        }catch(error){
          if (error.response === 510) {
            window.sessionStorage.clear();
            window.location = "/";
          }
          console.log(error)
        }
      }
      const GetEjecutables = async () => {
          try {
            const data = await ejecutablesServices.getEjecutables(jwt, {idRobot: proceso.idRobot});
            setEjecutables(data);
            ejecutables.map(async (ejecutable) =>{
              await GetStatus(ejecutable.nombre)
            })

          } catch (error) {
            if (error.response.status === 510) {
              window.sessionStorage.clear();
              window.location = "/";
            }
          }
      }
      const GetStatus = async (nombre) => {
        try {
          const data = await robotPrecios.checkRobot(jwt,{nombre:nombre})
          await ejecutablesServices.updateStatus(jwt, {status: data.message, criterio: nombre})
          const data2 = await ejecutablesServices.getEjecutables(jwt,{idRobot: proceso.idRobot});
          setEjecutables(data2);
          return data.message
        } catch (error) {
          if (error.response.status === 510) {
            window.sessionStorage.clear();
            window.location = "/"; 
          }
        }
    }
      useEffect(() => {
        GetEjecutables()
      }, []);
     
    return(
        <>
        <h3 className="col-1">Ejecutables</h3>
              {ejecutables.length > 0 ? (
            <Table striped> 
              <thead>
                <th>Id #</th>
                <th>Nombre</th>
                <th>Ruta</th>
                <th>Status</th>
                <th>Acciones</th>
              </thead>
              <tbody>
                  {ejecutables.map((ejecutable, index) => (
                      <tr key={index}>
                        <td>{ejecutable.id}</td>
                        <td>{ejecutable.nombre}</td>
                        <td>{ejecutable.ruta}</td>
                        <td> 
                        <div className={ejecutable.status === 1 ? "bordered-cell-on" : "bordered-cell-off"}>
                        {ejecutable.status === 1 ? "ON" : "OFF"}
                        </div>
                        </td>
                        <td>
                            <a onClick={async()=>handleSwitch(ejecutable.nombre,ejecutable.ruta, index)}>
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
export default Ejecutables