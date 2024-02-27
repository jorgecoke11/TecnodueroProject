import React, { useState, useEffect } from "react";
import InputRobotPrecios from './RobotPrecios';
import Dropdown from "./Desplegable";
import Constantes from "../js/Constantes";
import caso from "../services/casos";
import ModalComponent from "./ModalComponent";
import TableComponent from './RowCasos'
const MonitorizacionRobotPrecios = () =>{
    const URI = Constantes.URI
    const [screenComponent, setScreenComponent] = useState(null)
    const [dataCasos, setDataCasos] =  useState([]);
    const optionsRobots =['Robot precios']
    const [casosBalay, setCasosBalay] = useState([]);
    const [casosBosch, setCasosBosch] = useState([]);
    const [casosSiemens, setCasosSiemens] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {

        handleBalay()
        handleBosch()
        handleSiemens()
    }, []);
    const handleBalay = async()=>{
        const idtipo =1
        const data = await caso.getCasos({
            idtipo
        })
        setCasosBalay(data)
    }
    const handleBosch = async() =>{
        const idtipo =2
        const data = await caso.getCasos({
            idtipo
        })
        setCasosBosch(data)
    }
    const handleSiemens = async() =>{
        const idtipo =3
        const data = await caso.getCasos({
            idtipo
        })
        setCasosSiemens(data)
    }
    const handleClickCasos = async(idEstado) =>{
       try{
        const data = await caso.getCasosByIdEstado({
            idEstado
        })
        setDataCasos(data)
        setShowModal(true); // Abrir el modal
       }catch(err){

       }

        
    }
    return(
        <div>
            <h1>ROBOT PRECIOS</h1>
            <Dropdown label= "Balay" onClick={handleBalay}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Numero de casos</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {casosBalay.length > 0 ? (
                        casosBalay.map((caso, index) => (
                            <tr key={index}>
                                <td>{caso.nombre}</td>
                                <td>
                                    <button onClick={() => handleClickCasos(caso.idestado)}>
                                        {caso.numeroCasos}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No hay casos</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </Dropdown>
            <Dropdown label= "Bosch" onClick={handleBosch}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Estado</th> 
                            <th>Numero de casos</th>
                        </tr>
                    </thead>
                    <tbody>
                    {casosBosch.length > 0 ? (
                        casosBalay.map((caso, index) => (
                            <tr key={index}>
                                <td>{caso.nombre}</td>
                                <td>
                                    <button onClick={() => handleClickCasos(caso.idestado)}>
                                        {caso.numeroCasos}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No hay casos</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </Dropdown>
            <Dropdown label= "Siemens" onClick={handleSiemens}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Numero de casos</th>
                        </tr>
                    </thead>
                    <tbody>
                    {casosSiemens.length > 0 ? (
                        casosBalay.map((caso, index) => (
                            <tr key={index}>
                                <td>{caso.nombre}</td>
                                <td>
                                    <button onClick={() => handleClickCasos(caso.idestado)}>
                                        {caso.numeroCasos}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No hay casos</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </Dropdown>
     {/* Componente Modal */}
     <ModalComponent isOpen={showModal} onClose={() => setShowModal(false)}>
       <TableComponent data={dataCasos}></TableComponent>
      </ModalComponent>
        </div>
    )
}
export default MonitorizacionRobotPrecios