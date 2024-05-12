import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import InputComponent from "../InputComponent";
import Button from 'react-bootstrap/Button';
import useUser from "../../hooks/useUser.js";
import clientesServices from '../../services/clientes'
const NuevoCliente = ({ handleClose, getClientes}) => {
    const { jwt } = useUser();
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [nif, setNif] = useState('')
    const handleNuevoCliente = async() =>{
        try{
            const response = await clientesServices.createCliente(jwt, {
                cliente:{
                    nombre,
                    apellidos,
                    telefono,
                    email,
                    nif
                }
            })
            getClientes()
            handleClose()
        }catch(error){

        }
    }
    return (
        <>
            <InputComponent placeHolder='Nombre' setInputText={setNombre} ></InputComponent>
            <InputComponent placeHolder='Apellidos' setInputText={setApellidos} ></InputComponent>
            <InputComponent placeHolder='Telefonos' setInputText={setTelefono} ></InputComponent>
            <InputComponent placeHolder='Email' setInputText={setEmail}></InputComponent>
            <InputComponent placeHolder='Nif' setInputText={setNif}></InputComponent>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleNuevoCliente}>
                    Crear
                </Button>
            </Modal.Footer>
        </>
    )
}
export default NuevoCliente