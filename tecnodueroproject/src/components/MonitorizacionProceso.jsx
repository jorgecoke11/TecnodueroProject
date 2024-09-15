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
import tiposCasosCalls from "../services/tiposCasos";
import useUser from "../hooks/useUser";
const MonitorizacionProceso = ({nombreProceso, id_proceso}) =>{
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
    const [casosPorTipo, setCasosPorTipo] = useState([])
    const {jwt} = useUser()
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        actualizarProceso()
    };
    const handleCloseModal = () =>{
        setShowModal(false)
        actualizarProceso()
    }
    const handleCloseCalendarModal = () =>{
        setShowModalCalendar(false)
    }
    const actualizarProceso= () =>{
        handleTiposCasos()
    }
    const getCasos = async (tipoCaso) =>{
        try{
            var casosData = await caso.getCasos(
                jwt,{
                    idtipo: tipoCaso.idtipo,
                    fh_creacion: selectedDate
                })
                return casosData
        }catch(error){
            if(error.response.status === 510){
                window.sessionStorage.clear()
                window.location= '/'
            }
        }
    }
    const handleTiposCasos = async () =>{
        try{
            const data = await tiposCasosCalls.getTiposDeCaso(jwt,{
                id_proceso
            })
            const tiposCasoData = []
            for(var tipoCaso of data){
                var casosData = await getCasos(tipoCaso)
                tiposCasoData.push({
                    tipoCaso: tipoCaso,
                    casos: casosData
                })
            }
            setCasosPorTipo(tiposCasoData)
        }catch(error){
            if(error.response.status === 510){
                window.sessionStorage.clear()
                window.location= '/'
            }
        }
    }
    const handleActualizarTipoCaso = async (tipoCasoActualizado) =>{
        try{
            var casosData = await getCasos(tipoCasoActualizado)
            setCasosPorTipo(prevTiposCasos => {
                return prevTiposCasos.map(tipoCaso => {
                    // Si el tipo de caso es el que queremos actualizar, lo reemplazamos con el actualizado
                    if (tipoCaso.tipoCaso.idtipo === tipoCasoActualizado.idtipo) {
                        return {
                            tipoCaso: tipoCasoActualizado,
                            casos: casosData
                        };
                    }
                    // Si no, simplemente devolvemos el tipo de caso sin cambios
                    return tipoCaso;
                });
            });
        }catch(error){
            throw error
        }
    }
    useEffect(() => {
        handleTiposCasos();
        const intervalo = setInterval(() => {
            actualizarProceso();
        }, 60000);
      
        // Cleanup function to clear the timeout if the component unmounts
        return () => clearInterval(intervalo);
    }, [selectedDate]);

    const handleClickCasos = async(idEstado, idtipo) =>{
       try{
        const data = await caso.getCasosFecha(jwt,{
            idEstado,
            idtipo,
            fh_creacion: selectedDate
        })
        setDataCasos(data)
        setShowModal(true); // Abrir el modal
       }catch(err){

       }

    }
    const getRowStyle= (final)=>{
        switch(final){
            case 1:
                return "stylish-cell";
            default:
                return {backgroundColor: "transparent"};
            
        }
    }
    return(
        <div className="container col-4 p-3 border rounded">
            <div className="botones-proceso rounded" >
                <h1 className="titulo-proceso">{nombreProceso}</h1>
                <div className="d-flex align-items-center">
                    <div className="col-1 mb-3 mx-3 p-2 border rounded custom-icon" onClick={() =>setShowModalCalendar(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 448 512"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"/></svg>
                    </div>
                    <div className="col-1 mb-3 mx-3 p-2 border rounded custom-icon" onClick={() =>setShowModalCreadorCaso(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    </div>
                </div>
            </div>
  
            {Object.keys(casosPorTipo).length > 0 ? (
                Object.keys(casosPorTipo).map((key, index) => (
                    <Dropdown key={index} label={casosPorTipo[key].tipoCaso.nombre} onClick={()=>{handleActualizarTipoCaso(casosPorTipo[key].tipoCaso)}}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Estado</th>
                                    <th>Numero de casos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {casosPorTipo[key].casos.length > 0 ? (
                                    casosPorTipo[key].casos.map((caso, casoIndex) => (
                                        <tr key={casoIndex} className= {getRowStyle(caso.final)}>
                                            <td style={{backgroundColor: "transparent"}}>{caso.nombre}</td>
                                            <td style={{backgroundColor: "transparent"}}>
                                                <button className="button-17" onClick={() => handleClickCasos(caso.idestado, casosPorTipo[key].tipoCaso.idtipo)}>
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
                ))
            ) : (
                <p>No hay tipos de caso para este proceso</p>
            )}
     {/* Componente Modal */}
     <ModalComponent isOpen={showModal} onClose={() => handleCloseModal()} label={"Casos:"}>
       <TableComponent data={dataCasos}></TableComponent>
      </ModalComponent>
      <ModalComponent isOpen={showModalCalendar} onClose={() => handleCloseCalendarModal()}>
        <MyCalendar onDateChange={handleDateChange} ></MyCalendar>
      </ModalComponent>
      <ModalComponent isOpen={showModalCreadorCaso} onClose={() => {setShowModalCreadorCaso(false); handleTiposCasos()}}>
        <RobotPrecios></RobotPrecios>
      </ModalComponent>
        </div>
    )
}
export default MonitorizacionProceso