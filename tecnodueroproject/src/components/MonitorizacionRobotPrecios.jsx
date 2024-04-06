import React, { useState, useEffect } from "react";
import InputRobotPrecios from './RobotPrecios';
import Dropdown from "./Desplegable";
import Constantes from "../js/Constantes";
import caso from "../services/casos";
import ModalComponent from "./ModalComponent";
import TableComponent from './RowCasos'
import MyCalendar from "./MyCalendar";
import Accordion from 'react-bootstrap/Accordion';
import RobotPrecios from "../components/RobotPrecios";
const MonitorizacionRobotPrecios = () =>{
    const URI = Constantes.URI
    const [screenComponent, setScreenComponent] = useState(null)
    const [dataCasos, setDataCasos] =  useState([]);
    const optionsRobots =['Robot precios']
    const [casosBalay, setCasosBalay] = useState([]);
    const [casosBosch, setCasosBosch] = useState([]);
    const [casosSiemens, setCasosSiemens] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalCalendar, setShowModalCalendar] = useState(false);
    const [showModalCreadorCaso, setShowModalCreadorCaso] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
      handleBalay()
      handleBosch()
      handleSiemens() // Actualiza el estado de la fecha seleccionada
    };
    const handleCloseModal = () =>{
        setShowModal(false)
        handleBalay()
        handleBosch()
        handleSiemens()
    }
    const handleCloseCalendarModal = () =>{
        setShowModalCalendar(false)
    }
    const actualizarProceso= () =>{
        handleBalay()
        handleBosch()
        handleSiemens()
    }
    useEffect(() => {
        const intervalo = setInterval(() => {
            actualizarProceso()
          }, 60000);
      
          // Cleanup function to clear the timeout if the component unmounts
          return () => clearInterval(intervalo);
    }, [selectedDate]);
    const handleBalay = async()=>{
        const idtipo =1
        const data = await caso.getCasos({
            idtipo,
            fh_creacion: selectedDate
        })
        setCasosBalay(data)
    }
    const handleBosch = async() =>{
        const idtipo =2
        const data = await caso.getCasos({
            idtipo,
            fh_creacion: selectedDate
        })
        setCasosBosch(data)
    }
    const handleSiemens = async() =>{
        const idtipo =3
        const data = await caso.getCasos({
            idtipo,
            fh_creacion: selectedDate
        })
        setCasosSiemens(data)
    }
    const handleClickCasos = async(idEstado, idtipo) =>{
       try{
        const data = await caso.getCasosFecha({
            idEstado,
            idtipo,
            fh_creacion: selectedDate
        })
        setDataCasos(data)
        setShowModal(true); // Abrir el modal
       }catch(err){

       }

        
    }
    return(
        <div className="container col-4 p-3 border rounded">
            <div className="botones-proceso rounded" >
                <h1 className="titulo-proceso">ROBOT PRECIOS</h1>
                <div className="d-flex align-items-center">
                    <div className="col-1 mb-3 mx-3 p-2 border rounded custom-icon" onClick={() =>setShowModalCalendar(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 448 512"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"/></svg>
                    </div>
                    <div className="col-1 mb-3 mx-3 p-2 border rounded custom-icon" onClick={() =>setShowModalCreadorCaso(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    </div>
                </div>
                
                
            </div>
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
                                    <button onClick={() => handleClickCasos(caso.idestado,1)}>
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
                        casosBosch.map((caso, index) => (
                            <tr key={index}>
                                <td>{caso.nombre}</td>
                                <td>
                                    <button onClick={() => handleClickCasos(caso.idestado, 2)}>
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
                        casosSiemens.map((caso, index) => (
                            <tr key={index}>
                                <td>{caso.nombre}</td>
                                <td>
                                    <button onClick={() => handleClickCasos(caso.idestado, 3)}>
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
     <ModalComponent isOpen={showModal} onClose={() => handleCloseModal()} label={"Casos:"}>
       <TableComponent data={dataCasos}></TableComponent>
      </ModalComponent>
      <ModalComponent isOpen={showModalCalendar} onClose={() => handleCloseCalendarModal()}>
        <MyCalendar onDateChange={handleDateChange} ></MyCalendar>
      </ModalComponent>
      <ModalComponent isOpen={showModalCreadorCaso} onClose={() => {setShowModalCreadorCaso(false); handleBalay(); handleBosch(); handleSiemens();}}>
        <RobotPrecios></RobotPrecios>
      </ModalComponent>
        </div>
    )
}
export default MonitorizacionRobotPrecios