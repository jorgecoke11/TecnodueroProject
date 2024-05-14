import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import InputComponent from "../InputComponent";
import Button from 'react-bootstrap/Button';
import useUser from "../../hooks/useUser.js";
import clientesServices from '../../services/clientes'
const NuevoCliente = ({ handleClose, getClientes, setShowNotification }) => {
    const { jwt } = useUser();
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [nif, setNif] = useState('')
    const handleNuevoCliente = async (event) => {
        event.preventDefault(); // Evitar recargar la página
        try {
            const response = await clientesServices.createCliente(jwt, {
                cliente: {
                    nombre,
                    apellidos,
                    telefono,
                    email,
                    nif
                }
            })
            handleClose()
            console.log('e')
            getClientes()
            setShowNotification(true)
        } catch (error) {

        }
    }
    return (
        <>
            <form onSubmit={handleNuevoCliente}>
                <InputComponent placeHolder='Nombre' setInputText={setNombre} required></InputComponent>
                <InputComponent placeHolder='Apellidos' setInputText={setApellidos} required></InputComponent>
                <InputComponent placeHolder='Telefono' setInputText={setTelefono} ></InputComponent>
                <InputComponent placeHolder='Email' setInputText={setEmail}></InputComponent>
                <InputComponent placeHolder='NIF' setInputText={setNif}></InputComponent>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit">
                        Crear
                    </Button>
                </Modal.Footer>
            </form>
        </>
    )
}
export default NuevoCliente