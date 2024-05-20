import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import swal from 'sweetalert'
import useUser from "../../hooks/useUser.js";
import atras from '../../img/hacia-atras.png';
import Table from 'react-bootstrap/Table';
import { Tab } from "bootstrap";
import avisosServices from '../../services/aviso.js'
const Avisos = () => {
    const { jwt } = useUser();
    const [avisos, setAvisos] = useState([])
    const [diaSeleccionado, setDiaSeleccionado] = useState(new Date)
    const [showModalCalendar, setShowModalCalendar] = useState(false);
    const handleAtras = () => {
        window.location = '/'
    }
    const handleNuevoAviso = () => {

    }
    const getAvisos = async () => {
        try {
            const response = await avisosServices.getAvisos(jwt, {
                diaSeleccionado
            })
            setAvisos(response)
            console.log(response)
        } catch (error) {

        }
    }
    useEffect(() => {
        getAvisos()
    }, [])
    return (
        <>
            <div className="container">
                <img src={atras} className='atras' onClick={handleAtras} alt='atras'></img>
                <h3 className="avisos-div">Avisos:</h3>
                <div className="row mt-3 mb-3">
                    <div className=" col avisos-div">
                        <button className="btn btn-create" onClick={handleNuevoAviso}>Nuevo aviso</button>
                    </div>
                        <div className="col-1 mb-3 mx-3 p-2 border rounded custom-icon" onClick={() => setShowModalCalendar(true)}>
                            <svg className="icon-img" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 448 512"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" /></svg>
                        </div>
                </div>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Pendientes ({avisos.length})</Accordion.Header>
                        <Accordion.Body>
                            {avisos.map((aviso, index) => (
                                <div className="row avisos-div">
                                    <h2>{aviso.titulo}</h2>
                                    <label><b>Cliente: </b> {aviso.nombre}</label>
                                    <label><b>Dirección: </b>{aviso.calle} {aviso.cod_postal} {aviso.ciudad} {aviso.provincia} </label>
                                    <label><b>Fecha: </b>{new Date(aviso.fecha).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</label>
                                    <label><b>Hora: </b>{aviso.hora}</label>
                                    <label><b>Presupuesto: </b>{aviso.presupuesto}</label>
                                    <textarea>{aviso.observaciones}</textarea>
                                    <label><b>Tipo: </b>{aviso.tipo}</label>
                                    <label><b>Estado: </b>{aviso.estado}</label>
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Completados</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    )
}
export default Avisos