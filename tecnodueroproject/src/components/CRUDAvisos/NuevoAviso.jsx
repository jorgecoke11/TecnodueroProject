import React, { useEffect, useState } from "react";
import InputComponent from "../InputComponent";
import direccionesServices from '../../services/direcciones'
import useUser from "../../hooks/useUser.js";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/esm/Button.js";
import BuscadorClient from "../CRUDClientes/BuscadorClient.jsx";
import avisosServices from '../../services/aviso.js'
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import utils from "../../services/utils.js";
const NuevoAviso = ({ handleClose, getAvisosPendientes }) => {
    const { jwt } = useUser();
    const [nombreCliente, setNombreCliente] = useState([])
    const [cliente, setCliente] = useState('')
    const [calle, setCalle] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [provincia, setProvincia] = useState('')
    const [codPostal, setCodPostal] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [nif, setNif] = useState('')
    const [direccciones, setDirecciones] = useState([])
    const [direccion, setDireccion] = useState('')
    const [direccionSelected, setDireccionSelected] = useState('')
    const [showBuscadorCliente, setShowBuscadorCliente] = useState(false)
    const [direccionesView, setDireccionesView] = useState('')
    const [presupuesto, setPresupuesto] = useState('')
    const [tipo, setTipo] = useState('')
    const [titulo, setTitulo] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [hora, setHora] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const handleCloseBuscadorCliente = () => setShowBuscadorCliente(false);

    const handleCliente = async (cliente) => {

        setCliente(cliente)
        setNombreCliente(cliente[0].nombre + " " + cliente[0].apellidos)
        setTelefono(cliente[0].telefono)
        setEmail(cliente[0].email)
        setNif(cliente[0].nif)
        try {
            const response = await direccionesServices.getDireccionesPorId(jwt, {
                id_cliente: cliente[0].id
            })
            setDirecciones(response)
            console.log(direccciones)

    
        } catch (error) {

        }
    }
    const handleBuscarCliente = (event) => {
        setShowBuscadorCliente(true)

    }
    const SelectDireccionChange = (event) => {
        // Obtén el valor seleccionado del select
        const selectedValue = event.target.value;
        if (selectedValue == 0) {
            return
        }
        setDireccionSelected(selectedValue);

        // Obtén los datos de dirección del atributo data
        const selectedOption = event.target.selectedOptions[0];
        const direccionSelectedTemp = JSON.parse(selectedOption.dataset.direccion);
        setDireccion(direccionSelectedTemp)
        // Actualiza los estados individuales
        setCalle(direccionSelectedTemp.calle);
        setProvincia(direccionSelectedTemp.provincia);
        setCiudad(direccionSelectedTemp.ciudad);
        setCodPostal(direccionSelectedTemp.cod_postal);

        // Actualiza el componente de vista de direcciones
        setDireccionesView(
            <div>
                <InputComponent placeHolder='Direccion' setInputText={setCalle} text={direccionSelectedTemp.calle} disabled={true}></InputComponent>
                <InputComponent placeHolder='Provincia' setInputText={setProvincia} text={direccionSelectedTemp.provincia} disabled={true}></InputComponent>
                <InputComponent placeHolder='Ciudad' setInputText={setCiudad} text={direccionSelectedTemp.ciudad} disabled={true}></InputComponent>
                <InputComponent placeHolder='Código postal' setInputText={setCodPostal} text={direccionSelectedTemp.cod_postal} disabled={true}></InputComponent>
            </div>
        );
    };
    const handlePresupuesto = (presupuesto) => {
        const numberRegex = /^-?\d*\.?\d*$/;
        if (numberRegex.test(presupuesto)) {
            setPresupuesto(presupuesto)
        }
    }
    const SelectTipoChange = (event) => {
        const tipoTemp = event.target.value

        setTipo(tipoTemp)
    }
    const handleCrearAviso = async (event) => {
        try {
            event.preventDefault()
            if (cliente == '' || direccionSelected == '') {
                Swal.fire({
                    text: "Faltan campos",
                    icon: "error",
                    timer: 4000
                })
                handleClose()
            }
            else {
                Swal.fire({
                    title: "Completar aviso",
                    text: "¿Estas seguro de que desea crear este aviso?",
                    icon: "question",
                    showDenyButton: true,
                    confirmButtonText: "Si",
                    denyButtonText: `No`
                }).then(async result => {
                    if (result.isConfirmed) {
                        const response = await avisosServices.createAviso(jwt, {
                            aviso: {
                                titulo,
                                fecha: startDate,
                                hora,
                                id_direccion: direccion.id,
                                observaciones,
                                presupuesto,
                                tipo,
                                estado: 1
                            }
                        })
                        Swal.fire({
                            text: "Aviso creado",
                            icon: "success",
                            timer: 4000
                        })
                        utils.enviarEmail(jwt,{
                            to: 'tecnoduero@live.com',
                            subject: 'Nuevo aviso',
                            text: 'Nuevo aviso creado en la plataforma -> http://192.168.1.3:81'
                        })
                        
                        getAvisosPendientes()
                        handleClose()
                    }
                })
            }
        } catch (error) {

        }
    }
    const handleObservaciones = (observaciones) => {

        setObservaciones(observaciones.target.value)
    }
    const handleHora = (hora) => {
        const numberRegex = /^-?\d*\:?\d*$/;
        if (numberRegex.test(hora)) {
            setHora(hora)
        }
    }
    return (
        <>
            <form onSubmit={handleCrearAviso}>

                <div className="container">
                    <InputComponent placeHolder='Titulo del aviso' setInputText={setTitulo} text={titulo} required></InputComponent>
                    <div className="text-center mt-3">
                        <label>Fecha: {"\t"}</label>
                        <DatePicker
                            className="form-control"
                            showIcon
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <InputComponent placeHolder='Hora' setInputText={handleHora} text={hora} ></InputComponent>
                    <h3 className="mt-2">Cliente:</h3>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" onClick={handleBuscarCliente}>Buscar cliente</button>
                        <input className="form-control" placeholder="Cliente" value={nombreCliente} required disabled={true}></input>
                    </div>
                    <InputComponent placeHolder='Telefonos' setInputText={setTelefono} text={telefono} disabled={true}></InputComponent>
                    <InputComponent placeHolder='Email' setInputText={setEmail} text={email} disabled={true}></InputComponent>
                    <InputComponent placeHolder='Nif' setInputText={setNif} text={nif} disabled={true}></InputComponent>
                    <h3>Direccion: </h3>
                    {direccciones.length > 0 &&
                        <div>
                            <select value={direccionSelected} data- className='form-control' onChange={SelectDireccionChange}>
                                <option selected key={0}></option>
                                {direccciones.map((direccion, index) => (
                                    <option key={index} value={`${direccion.calle} ${direccion.cod_postal}`} data-direccion={JSON.stringify(direccion)}>{direccion.calle} {direccion.cod_postal}</option>
                                ))}
                            </select>
                            {direccionesView}
                        </div>
                    }
                    {direccciones.length === 0 && nombreCliente.length != 0 &&
                        <div>
                            <label>Este cliente no tiene direcciones </label>
                        </div>
                    }
                    <h3>Otros:</h3>
                    <InputComponent placeHolder='Presupuesto' setInputText={handlePresupuesto} text={presupuesto} required></InputComponent>
                    <div class="form-floating mt-3">
                        <textarea class="form-control" placeholder="Observaciones" id="floatingTextarea" onChange={handleObservaciones}></textarea>
                        <label for="floatingTextarea">Observaciones</label>
                    </div>
                    <select value={tipo} data- className='form-control mt-3' onChange={SelectTipoChange} required>
                        <option selected key={0}></option>
                        <option value={'POCO URGENTE'}>POCO URGENTE</option>
                        <option value={'URGENTE'}>URGENTE</option>
                    </select>
                </div>
                <Modal.Footer className="mt-3" >
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit">
                        Crear aviso
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
export default NuevoAviso