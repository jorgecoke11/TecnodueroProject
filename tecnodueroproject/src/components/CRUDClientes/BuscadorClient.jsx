import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import InputComponent from "../InputComponent";
import Button from 'react-bootstrap/Button';
import useUser from "../../hooks/useUser.js";
import clientesServices from "../../services/clientes.js";
const BuscadorClient = ({setClientesTable, handleCloseBuscadorCliente}) => {
    const { jwt } = useUser();
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [nif, setNif] = useState('')
    const [clientes, setClientes] = useState([])
    const [clienteSeleccionado, setClienteSeleccionado] = useState('')
    const [clienteSeleccionadoTabla, setClienteSeleccionadoTabla] = useState([])
    useEffect(() => {
        handleBuscarCliente()
    }, [nombre, apellidos, telefono, email, nif])
    const handleBuscarCliente = async () => {
        const conditions = {};
        if (nombre) conditions.nombre = nombre;
        if (apellidos) conditions.apellidos = apellidos;
        if (telefono) conditions.telefono = telefono;
        if (email) conditions.email = email;
        if (nif) conditions.nif = nif;
        if (Object.keys(conditions).length === 0) {
            return; // No hay condiciones, salir de la función
        }
        try {
            const response = await clientesServices.getClientsConditions(jwt, {
                ...conditions
            })
            setClientes(response)
        } catch (error) {

        }
    }
    const handleClientSelected = (event) => {
        const selectedOption = event.target.selectedOptions[0];
        const clientData = selectedOption.dataset.client;
        setClienteSeleccionado(event.target.value);
        setClienteSeleccionadoTabla(JSON.parse(clientData))
    }
    const handleMostrarInfo = () =>{
        setClientesTable([clienteSeleccionadoTabla])
        handleCloseBuscadorCliente()
    }
    return (
        <div className="row">
            <div className="col">
                <InputComponent placeHolder='Nombre' setInputText={setNombre} ></InputComponent>
                <InputComponent placeHolder='Email' setInputText={setEmail}></InputComponent>
            </div>
            <div className="col">
                <InputComponent placeHolder='Apellidos' setInputText={setApellidos} ></InputComponent>
                <InputComponent placeHolder='NIF' setInputText={setNif}></InputComponent>
            </div>
            <div className="col">
                <InputComponent placeHolder='Telefono' setInputText={setTelefono} ></InputComponent>
            </div>
            <div className="container">
                <select class="form-select mt-3 ml-3" size="5" aria-label="Size 3 select example" onChange={handleClientSelected}>
                    {clientes.map((cliente, index) => (
                        <option key={index} value={`${cliente.nombre} ${cliente.apellidos}`} data-client={JSON.stringify(cliente)}>{cliente.nombre} {cliente.apellidos}</option>
                    ))}
                </select>
            </div>
            <InputComponent placeHolder='Cliente' text={clienteSeleccionado} disabled={true} ></InputComponent>
            <Modal.Footer className="mt-3">
                <Button variant="secondary" onClick={handleCloseBuscadorCliente}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleMostrarInfo}>
                    Mostrar informacion
                </Button>
            </Modal.Footer>

        </div>
    )
}
export default BuscadorClient