import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import InputComponent from "../InputComponent";
import Button from 'react-bootstrap/Button';
import useUser from "../../hooks/useUser.js";
import clientesServices from "../../services/clientes.js";
import swal from 'sweetalert'
const BuscadorClient = ({ setClientesTable = null, handleCloseBuscadorCliente }) => {
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
    const handleMostrarInfo = async (event) => {
        await event.preventDefault();
        if (clienteSeleccionado.length == 0) {
            swal({
                title: "¡Cuidado!",
                text: "No se ha seleccionado cliente",
                timer: 3000,
                icon: "warning",
                showConfirmButton: false
            });
        } else {
            if(setClientesTable){
                await setClientesTable([clienteSeleccionadoTabla])
            }
            await handleCloseBuscadorCliente()
        }
    }
    return (
        <div className="row">
            <form onSubmit={handleMostrarInfo}>
                <InputComponent placeHolder='Nombre' setInputText={setNombre} ></InputComponent>
                <InputComponent placeHolder='Apellidos' setInputText={setApellidos} ></InputComponent>
                <InputComponent placeHolder='Email' setInputText={setEmail}></InputComponent>
                <InputComponent placeHolder='NIF' setInputText={setNif}></InputComponent>
                <InputComponent placeHolder='Telefono' setInputText={setTelefono} ></InputComponent>
                <div className="container">
                    <select class="form-select mt-3 ml-3" size="5" aria-label="Size 3 select example" onChange={handleClientSelected}>
                        {clientes.map((cliente, index) => (
                            <option key={index} value={`${cliente.nombre} ${cliente.apellidos}`} data-client={JSON.stringify(cliente)}>{cliente.nombre} {cliente.apellidos}</option>
                        ))}
                    </select>
                </div>
                <InputComponent placeHolder='Cliente' text={clienteSeleccionado} disabled={true} required></InputComponent>
                <Modal.Footer className="mt-3">
                    <Button variant="secondary" onClick={handleCloseBuscadorCliente}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit">
                        Mostrar informacion
                    </Button>
                </Modal.Footer>
            </form>
        </div>
    )
}
export default BuscadorClient