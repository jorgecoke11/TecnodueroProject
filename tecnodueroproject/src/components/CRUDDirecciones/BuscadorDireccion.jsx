import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import InputComponent from "../InputComponent";
import Button from 'react-bootstrap/Button';
import useUser from "../../hooks/useUser.js";
import direccionesServices from "../../services/direcciones.js";
import swal from 'sweetalert'
const BuscadorDireccion = ({ setDireccionesTable = null, handleCloseBuscadorDireccion }) => {
    const { jwt } = useUser();
    const [calle, setCalle] = useState('')
    const [provincia, setProvincia] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [codPostal, setCodPostal] = useState('')

    const [direcciones, setDirecciones] = useState([])
    const [direccionSeleccionada, setDireccionSeleccionada] = useState('')
    const [direccionSeleccionadaTabla, setDireccionSeleccionadaTabla] = useState([])
    useEffect(() => {
        handleBuscarDireccion()
    }, [calle, provincia, ciudad, codPostal])
    const handleBuscarDireccion = async () => {
        const conditions = {};
        if (calle) conditions.calle = calle;
        if (provincia) conditions.provincia = provincia;
        if (ciudad) conditions.ciudad = ciudad;
        if (codPostal) conditions.cod_postal= codPostal;
        if (Object.keys(conditions).length === 0) {
            return; // No hay condiciones, salir de la función
        }
        try {
            const response = await direccionesServices.getDireccionConditions(jwt, {
                ...conditions
            })
            setDirecciones(response)
        } catch (error) {

        }
    }
    const handleDireccionSelected = (event) => {
        const selectedOption = event.target.selectedOptions[0];
        const clientData = selectedOption.dataset.client;
        setDireccionSeleccionada(event.target.value);
        setDireccionSeleccionadaTabla(JSON.parse(clientData))
    }
    const handleMostrarInfo = async (event) => {
        await event.preventDefault();
        if (direccionSeleccionada.length == 0) {
            swal({
                title: "¡Cuidado!",
                text: "No se ha seleccionado dirección",
                timer: 3000,
                icon: "warning",
                showConfirmButton: false
            });
        } else {
            if(setDireccionesTable){
                await setDireccionesTable([direccionSeleccionadaTabla])
            }
            await handleCloseBuscadorDireccion()
        }
    }
    return (
        <div className="row">
            <form onSubmit={handleMostrarInfo}>
                <InputComponent placeHolder='Direccion' setInputText={setCalle} ></InputComponent>
                <InputComponent placeHolder='Provincia' setInputText={setProvincia} ></InputComponent>
                <InputComponent placeHolder='Ciudad' setInputText={setCiudad}></InputComponent>
                <InputComponent placeHolder='Código postal' setInputText={setCodPostal}></InputComponent>
                <div className="container">
                    <select class="form-select mt-3 ml-3" size="5" aria-label="Size 3 select example" onChange={handleDireccionSelected}>
                        {direcciones.map((direccion, index) => (
                            <option key={index} value={`${direccion.calle} ${direccion.cod_postal}`} data-client={JSON.stringify(direccion)}>{direccion.calle} {direccion.cod_postal}</option>
                        ))}
                    </select>
                </div>
                <Modal.Footer className="mt-3">
                    <Button variant="secondary" onClick={handleCloseBuscadorDireccion}>
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
export default BuscadorDireccion