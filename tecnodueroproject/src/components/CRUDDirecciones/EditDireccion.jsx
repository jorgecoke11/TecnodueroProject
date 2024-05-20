import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import InputComponent from "../InputComponent";
import Button from 'react-bootstrap/Button';
import useUser from "../../hooks/useUser.js";
import direccionesServices from '../../services/direcciones.js'
const EditDireccion = ({ direccion, handleClose, getDirecciones }) => {
    const { jwt } = useUser();
    const [calle, setCalle] = useState('')
    const [provincia, setProvincia] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [codPostal, setCodPostal] = useState('')
    const handleEditPost = async () => {
        try {
            direccionesServices.updateDireccion(jwt, {
                nuevosDatos: {
                    calle,
                    provincia,
                    ciudad,
                    codPostal
                },
                criterio: {
                    id: direccion.id
                }
            })
            getDirecciones()
            console.log(direccion)
            handleClose()
        } catch (error) {

        }
    }
    useEffect(() => {
        setCalle(direccion.calle)
        setProvincia(direccion.provincia)
        setCiudad(direccion.ciudad)
        setCodPostal(direccion.cod_postal)
    }, [])
    return (
        <div>
            <InputComponent placeHolder='Direccion' setInputText={setCalle} text={calle}></InputComponent>
            <InputComponent placeHolder='Provincia' setInputText={setProvincia} text={provincia}></InputComponent>
            <InputComponent placeHolder='Ciudad' setInputText={setCiudad} text={ciudad}></InputComponent>
            <InputComponent placeHolder='Código postal' setInputText={setCodPostal} text={codPostal}></InputComponent>
            <Modal.Footer className="mt-3" >
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleEditPost}>
                    Editar
                </Button>
            </Modal.Footer>
        </div>
    )
}
export default EditDireccion