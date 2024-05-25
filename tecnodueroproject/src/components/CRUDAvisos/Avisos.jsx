import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser.js";
import atras from '../../img/hacia-atras.png';
import Table from 'react-bootstrap/Table';
import { Tab } from "bootstrap";
import avisosServices from '../../services/aviso.js'
import NuevoAviso from "./NuevoAviso.jsx";
import Modal from 'react-bootstrap/Modal';
import AddObservacion from "./AddObservaciones.jsx";
const Avisos = () => {
    const { jwt,username } = useUser();
    const [avisos, setAvisos] = useState([])
    const [avisosPendientes, setAvisosPendientes] = useState([])
    const [avisosCompletados, setAvisosCompletados] = useState([])
    const [diaSeleccionado, setDiaSeleccionado] = useState(new Date)
    const [showModalCalendar, setShowModalCalendar] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const [idAvisoActual, setIdAvisoActual] = useState('')
    const [observacionActual, setObservacionActual] = useState('')
    const [startDate, setStartDate] = useState(new Date(currentYear, currentMonth, 1));
    const [endDate, setEndDate] = useState(new Date(currentYear, currentMonth + 1, 0));
    const [showNuevoAviso, setNuevoAviso] = useState(false)
    const [showNuevaObservacion, setShowNuevaObservacion] = useState(false)
    const handleCloseNuevoAviso = () => setNuevoAviso(false);
    const handleCloseNuevaObservacion =() => setShowNuevaObservacion(false)
    const handleAtras = () => {
        window.location = '/'
    }
    const handleNuevoAviso = () => {
        setNuevoAviso(true)
    }
    const getAvisosPendientes = async () => {
        try {
            const response = await avisosServices.getAvisos(jwt, {
                startDate,
                endDate,
                estado: 0
            })
            setAvisosPendientes(response)
            console.log(response)
        } catch (error) {
        }
    }
    const getAvisosCompletados = async () => {
        try {
            const response = await avisosServices.getAvisos(jwt, {
                startDate,
                endDate,
                estado: 1
            })
            setAvisosCompletados(response)
            console.log(response)
        } catch (error) {
        }
    }
    // Función para obtener todas las fechas de un mes
    const getMonthStartAndEndDates = async (month) => {
        const start = new Date(currentYear, month, 1)
        const end = new Date(currentYear, month + 1, 0)
        return { start, end }
    };


    const handleMonthChange = async (event) => {
        const month = parseInt(event.target.value);
        setSelectedMonth(month)
        const { start, end } = await getMonthStartAndEndDates(month)
        console.log(start)
        console.log(end)
        setStartDate(start)
        setEndDate(end)
        try {
            const response = await avisosServices.getAvisos(jwt, {
                startDate: start,
                endDate: end,
                estado: 0
            })
            setAvisosPendientes(response)
            const responseCompletos = await avisosServices.getAvisos(jwt, {
                startDate: start,
                endDate: end,
                estado: 1
            })
            setAvisosCompletados(responseCompletos)
            console.log(response)
        } catch (error) {

        }
    };
    const handleClickCambiarEstado = (id, estado) => {

        try {
            Swal.fire({
                title: "Completar aviso",
                text: "¿Estas seguro de que desea completar este aviso?",
                icon: "question",
                showDenyButton: true,
                confirmButtonText: "Si",
                denyButtonText: `No`
            }).then(async result => {
                if (result) {
                    if (result.isConfirmed) {
                        const response = avisosServices.updateAviso(jwt, {
                            nuevosDatos: {
                                estado: estado
                            },
                            criterio: {
                                id
                            }
                        })
                        Swal.fire({
                            text: "Aviso completado",
                            icon: "success",
                            timer: 4000
                        })
                        getAvisosCompletados()
                        getAvisosPendientes()
                    } else if (result.isDenied) {
                    }
                }
            })

        } catch (error) {

        }
    }
    const handleAddObservacion = async(idAviso, observacion) =>{
        setIdAvisoActual(idAviso)
        setObservacionActual(observacion)
        setShowNuevaObservacion(true)
    }
    useEffect(() => {
        getAvisosPendientes()
        getAvisosCompletados()
    }, [selectedMonth])
    return (
        <>
            <div className="container">
                <img src={atras} className='atras' onClick={handleAtras} alt='atras'></img>
                <h3 className="">Avisos:</h3>
                <div className="row mt-3 mb-3">
                    <div className="col">
                        <button className="btn btn-create mb-3" onClick={handleNuevoAviso}>Nuevo aviso</button>
                        <select value={selectedMonth} className='form-control' onChange={handleMonthChange}>
                            <option value={0}>Enero</option>
                            <option value={1}>Febrero</option>
                            <option value={2}>Marzo</option>
                            <option value={3}>Abril</option>
                            <option value={4}>Mayo</option>
                            <option value={5}>Junio</option>
                            <option value={6}>Julio</option>
                            <option value={7}>Agosto</option>
                            <option value={8}>Septiembre</option>
                            <option value={9}>Octubre</option>
                            <option value={10}>Noviembre</option>
                            <option value={11}>Diciembre</option>
                        </select>

                    </div>
                </div>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Pendientes ({avisosPendientes.length})</Accordion.Header>
                        <Accordion.Body>
                            <ul class="list-group">
                                {avisosPendientes.map((aviso, index) => (
                                    <li class="list-group-item ">
                                        <div className="row avisos-div">


                                            <h2>{aviso.titulo}</h2>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                                </svg>
                                                <b> Cliente: </b> {aviso.nombre}</label>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                </svg>
                                                <b> Dirección: </b>{aviso.calle} {aviso.cod_postal} {aviso.ciudad} {aviso.provincia} </label>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                                </svg>
                                                <b> Fecha: </b>{new Date(aviso.fecha).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</label>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                                </svg>
                                                <b> Hora: </b>{aviso.hora}</label>
                                            <b>Observaciones:</b>
                                            <textarea className="form-control mt-3" rows={7} disabled={true}>{aviso.observaciones}</textarea>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
                                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                                                </svg>
                                                <b> Presupuesto: </b>{aviso.presupuesto}€</label>
                                            <label>
                                                <b>Tipo: </b>
                                                {aviso.tipo === 'URGENTE' ? 'URGENTE' : 'POCO URGENTE'}
                                                {aviso.tipo === 'URGENTE' && <div className="circle"></div>}
                                            </label>
                                            <label>
                                                <b>Estado: </b>{aviso.estado === 0 ? 'Pendiente' : 'Completado'}


                                            </label>
                                            {aviso.estado === 0 &&
                                                <div className="container">
                                                    <button className="btn btn-success" onClick={() => handleClickCambiarEstado(aviso.id, 1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                                        </svg>
                                                    </button>
                                                    <button className="btn btn-secondary" onClick={() => handleAddObservacion(aviso.id, aviso.observaciones)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                                                        </svg>
                                                    </button>
                                                </div>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Completados ({avisosCompletados.length})</Accordion.Header>
                        <Accordion.Body>
                            <ul class="list-group">
                                {avisosCompletados.map((aviso, index) => (
                                    <li class="list-group-item ">
                                        <div className="row avisos-div">


                                            <h2>{aviso.titulo}</h2>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                                </svg>
                                                <b> Cliente: </b> {aviso.nombre}</label>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                                </svg>
                                                <b> Dirección: </b>{aviso.calle} {aviso.cod_postal} {aviso.ciudad} {aviso.provincia} </label>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                                </svg>
                                                <b> Fecha: </b>{new Date(aviso.fecha).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</label>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                                </svg>
                                                <b> Hora: </b>{aviso.hora}</label>
                                            <b>Observaciones:</b>
                                            <textarea disabled={true}>{aviso.observaciones}</textarea>
                                            <label>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
                                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                                                </svg>
                                                <b> Presupuesto: </b>{aviso.presupuesto}€</label>
                                            <label>
                                                <b>Tipo: </b>
                                                {aviso.tipo === 'URGENTE' ? 'URGENTE' : 'POCO URGENTE'}
                                                {aviso.tipo === 'URGENTE' && <div className="circle"></div>}
                                            </label>
                                            <label>
                                                <b>Estado: </b>{aviso.estado === 0 ? 'Pendiente' : 'Completado'}


                                            </label>
                                            {aviso.estado === 0 &&
                                                <div>
                                                    <button className="btn btn-success" onClick={() => handleClickCambiarEstado(aviso.id, 1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                                        </svg>
                                                    </button>
                                                    <button className="btn btn-secondary" onClick={() => handleAddObservacion()}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
                                                        </svg>
                                                    </button>
                                                </div>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <Modal className="modal-xl" show={showNuevoAviso} onHide={handleCloseNuevoAviso}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo aviso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NuevoAviso getAvisosPendientes={getAvisosPendientes} handleClose={handleCloseNuevoAviso} ></NuevoAviso>
                </Modal.Body>
            </Modal>
            <Modal className="modal-xl" show={showNuevaObservacion} onHide={handleCloseNuevaObservacion}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva observacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddObservacion idAviso={idAvisoActual} observacionActual={observacionActual} getPendientes={getAvisosPendientes} handleClose={handleCloseNuevaObservacion}></AddObservacion>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Avisos