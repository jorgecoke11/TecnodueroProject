import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import InputComponent from "../InputComponent";
import Button from 'react-bootstrap/Button';
import useUser from "../../hooks/useUser.js";
import direccionesServices from '../../services/direcciones.js'
import BuscadorClient from "../CRUDClientes/BuscadorClient.jsx";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const NuevaDireccion = ({ handleClose, getClientes, setShowNotification }) => {
    const { jwt } = useUser();
    const [id_cliente, setIdCliente] = useState([])
    const [nombreCliente, setNombreCliente] = useState([])
    const [calle, setCalle] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [provincia, setProvincia] = useState('')
    const [codPostal, setCodPostal] = useState('')

    const [showBuscadorCliente, setShowBuscadorCliente] = useState(false)
    const handleCloseBuscadorCliente = () => setShowBuscadorCliente(false);

    const handleNuevoCliente = async (event) => {
        event.preventDefault(); // Evitar recargar la página
        try {
            const response = await direccionesServices.createDireccion(jwt, {
                direccion: {
                    id_cliente,
                    calle,
                    ciudad,
                    provincia,
                    codPostal
                }
            })
            handleClose()
            console.log('e')
            getClientes()
            setShowNotification(true)
        } catch (error) {

        }
    }
    const handleBuscarCliente = (event) => {
        setShowBuscadorCliente(true)
    }
    const handleCliente = (cliente) => {
        console.log(cliente)
        setIdCliente(cliente[0].id)
        setNombreCliente(cliente[0].nombre + " " + cliente[0].apellidos)

    }
    return (
        <>
            <div className="input-group mb-3">
                <button className="btn btn-outline-secondary" onClick={handleBuscarCliente}>Buscar cliente</button>
                <input className="form-control" placeholder="Cliente" value={nombreCliente} required disabled={true}></input>
                {/* <InputComponent placeHolder='Cliente' text={nombreCliente} required disabled={true} onClick={handleBuscarCliente}></InputComponent> */}
            </div>
            <form onSubmit={handleNuevoCliente}>
                <InputComponent placeHolder='Calle' setInputText={setCalle} required></InputComponent>
                <InputComponent placeHolder='Ciudad' setInputText={setCiudad} required></InputComponent>
                <InputComponent placeHolder='Provincia' setInputText={setProvincia} required></InputComponent>
                <InputComponent placeHolder='Código postal' setInputText={setCodPostal}></InputComponent>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit">
                        Crear
                    </Button>
                </Modal.Footer>
            </form>
            <Modal className="modal-xl" show={showBuscadorCliente} onHide={handleCloseBuscadorCliente}>
                <Modal.Header closeButton>
                    <Modal.Title>Buscador cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BuscadorClient setClientesTable={handleCliente} showBuscadorCliente={showBuscadorCliente} handleCloseBuscadorCliente={handleCloseBuscadorCliente}></BuscadorClient>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default NuevaDireccion