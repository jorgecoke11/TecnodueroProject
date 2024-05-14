import React, { useState, useEffect } from "react";
import InputComponent from "../InputComponent";
import Table from 'react-bootstrap/Table';
import clientesServices from '../../services/clientes'
import useUser from "../../hooks/useUser.js";

import Modal from 'react-bootstrap/Modal';
import EditCliente from './EditCliente.jsx'
import NuevoCliente from './NuevoCliente.jsx'
import BuscadorClient from "./BuscadorClient.jsx";
import atras from '../../img/hacia-atras.png';
const Clientes = () => {
    const { jwt } = useUser();
    const [clientes, setClientes] = useState([]);
    const [clienteBusqueda, setClienteBusqueda] = useState('')
    const [show, setShow] = useState(false);
    const [showNuevoCliente, setShowNuevoCliente] = useState(false);
    const [showBuscadorCliente, setShowBuscadorCliente] = useState(false)
    const [modelContent, setModelContent] = useState('')
    const [modelContentNuevoCliente, setModelContentNuevoCliente] = useState('')
    const [modelContentBuscadorCliente, setModelContentBuscadorCliente] = useState('')
    const handleClose = () => setShow(false);
    const handleCloseNuevoCliente = () => setShowNuevoCliente(false);
    const handleCloseBuscadorCliente = () => setShowBuscadorCliente(false);
    const handleShow = () => setShow(true);
    const handleEdit = (cliente, indice) => {
        setModelContent(
            <EditCliente cliente={cliente} setShow={setShow} handleClose={handleClose} getClientes={getClientes}></EditCliente>
        )
        handleShow()
    }
    const handleNuevoCLiente = () => {
        setModelContentNuevoCliente(
            <NuevoCliente handleClose={handleCloseNuevoCliente} getClientes={getClientes}></NuevoCliente>
        )
        setShowNuevoCliente(true)
    }
    const handleBuscadorCliente  = () =>{
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
    const handleAtras = () =>{
        window.location= '/'
      }
    return (
        <div className="container">
            <img src={atras} className='atras' onClick={handleAtras} alt='atras'></img>
            <div className="row mt-3">
                <div className="col-2">
                    <button className="btn btn-primary" onClick={handleNuevoCLiente}>Nuevo cliente</button>
                </div>
                <div className="col-2">

                <button className="btn btn-primary" onClick={handleBuscadorCliente}>Buscar cliente</button>
                </div>

            </div>
            <InputComponent placeHolder='Clientes' setInputText={setClienteBusqueda}></InputComponent>
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
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellidos}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.nif}</td>
                            <td>
                                <a onClick={async () => handleEdit(cliente, index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
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
