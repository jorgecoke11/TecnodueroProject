import React, { useState, useEffect } from "react";
import InputComponent from "../InputComponent";
import Table from 'react-bootstrap/Table';
import clientesServices from '../../services/clientes'
import useUser from "../../hooks/useUser.js";
import NotificationComponent from "../NotificationComponent.jsx";
import Modal from 'react-bootstrap/Modal';
import EditCliente from './EditCliente.jsx'
import NuevoCliente from './NuevoCliente.jsx'
import BuscadorClient from "./BuscadorClient.jsx";
import atras from '../../img/hacia-atras.png';
import AlertaConfirmacion from "../AlertaConfirmacion.jsx";
import swal from 'sweetalert'
const Clientes = () => {
    const { jwt } = useUser();
    const [clientes, setClientes] = useState([]);
    const [clienteBusqueda, setClienteBusqueda] = useState('')

    const [show, setShow] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showNuevoCliente, setShowNuevoCliente] = useState(false);
    const [showBuscadorCliente, setShowBuscadorCliente] = useState(false)
    const [showAlertaConfirmacion, setshowAlertaConfirmacion] = useState(false)

    const [modelContent, setModelContent] = useState('')
    const [modelContentNuevoCliente, setModelContentNuevoCliente] = useState('')
    const [modelContentBuscadorCliente, setModelContentBuscadorCliente] = useState('')

    const handleClose = () => setShow(false);
    const handleCloseNuevoCliente = () => setShowNuevoCliente(false);
    const handleCloseBuscadorCliente = () => setShowBuscadorCliente(false);
    const handleCloseAlertaConfirmacion = () => setshowAlertaConfirmacion(false)

    const handleShow = () => setShow(true);
    const handleEdit = (cliente) => {
        setModelContent(
            <EditCliente
                cliente={cliente}
                setShow={setShow}
                handleClose={handleClose}
                getClientes={getClientes}
            ></EditCliente>
        )
        handleShow()
    }

    const handleNuevoCLiente = () => {
        setModelContentNuevoCliente(
            <NuevoCliente
                handleClose={handleCloseNuevoCliente}
                getClientes={getClientes}
                setShowNotification={setShowNotification}></NuevoCliente>
        )
        setShowNuevoCliente(true)
    }
    const handleBuscadorCliente = () => {
        setShowBuscadorCliente(true)
    }
    const getClientes = async () => {
        try {
            const response = await clientesServices.getClientes(jwt);
            setClientes(response); // Assuming response structure has a "data" property containing array of clients
        } catch (error) {
            console.error("Error fetching clientes:", error);
        }
    }
    useEffect(() => {
        getClientes()
    }, []);
    const handleAtras = () => {
        window.location = '/'
    }
    const handleDelete = async (cliente) => {
        try {
            swal({
                title:"Eliminar cliente",
                text: "¿Estas seguro de que desea eliminar al cliente?",
                icon: "warning",
                buttons:["No", "Si"]
            }).then(async respuesta =>{
                if(respuesta){
                    const response = await clientesServices.deleteCliente(jwt, {
                        clienteId: cliente.id
                    })
                    getClientes()
                    swal({text: "El cliente se ha borrado con exito",
                    icon: "success",
                timer:4000})
                }
            })

        } catch (error) {

        }
    }
    return (
        <div className="container">
            <NotificationComponent
                setShowNotification={setShowNotification}
                showNotification={showNotification}
                title="¡Exito!"
                body="Cliente creado correctamente"
            ></NotificationComponent>

            <img src={atras} className='atras' onClick={handleAtras} alt='atras'></img>
            <div className="row mt-3">
                <div className="col-2">
                    <button className="btn btn-create" onClick={handleNuevoCLiente}>Nuevo cliente</button>
                </div>
                <div className="col-2">
                    <button className="btn btn-search mb-3" onClick={handleBuscadorCliente}>Buscar cliente</button>
                </div>
            </div>
            <Table striped>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Telefono</th>
                        <th>email</th>
                        <th>NIF</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente, index) => (
                        <tr key={cliente.id}>
                            <td >{cliente.id}</td>
                            <td >{cliente.nombre}</td>
                            <td >{cliente.apellidos}</td>
                            <td >{cliente.telefono}</td>
                            <td >{cliente.email}</td>
                            <td >{cliente.nif}</td>
                            <td>
                                <a onClick={async () => handleEdit(cliente)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prueba bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </a>
                                <a onClick={async () => handleDelete(cliente)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class=" prueba bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modelContent}
                </Modal.Body>
            </Modal>
            <Modal show={showNuevoCliente} onHide={handleCloseNuevoCliente}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modelContentNuevoCliente}
                </Modal.Body>
            </Modal>
            <Modal className="modal-xl" show={showBuscadorCliente} onHide={handleCloseBuscadorCliente}>
                <Modal.Header closeButton>
                    <Modal.Title>Buscador cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BuscadorClient setClientesTable={setClientes} showBuscadorCliente={showBuscadorCliente} handleCloseBuscadorCliente={handleCloseBuscadorCliente}></BuscadorClient>
                </Modal.Body>
            </Modal>
            
        </div>
    )
}

export default Clientes;
