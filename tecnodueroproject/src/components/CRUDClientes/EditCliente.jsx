    import React, { useState, useEffect } from "react";
    import Modal from 'react-bootstrap/Modal';
    import InputComponent from "../InputComponent";
    import Button from 'react-bootstrap/Button';
    import useUser from "../../hooks/useUser.js";
    import clientesServices from '../../services/clientes'
    const EditCliente = ({cliente, handleClose, getClientes}) =>{
        const { jwt } = useUser();
        const[nombre, setNombre] =useState('')
        const[apellidos, setApellidos] =useState('')
        const[telefono, setTelefono] =useState('')
        const[email, setEmail] =useState('')
        const[nif, setNif] =useState('')
        const handleEditPost = async () =>{
            try{
                clientesServices.updateCliente(jwt,{
                    nuevosDatos:{
                        nombre,
                        apellidos,
                        telefono,
                     email,
                     nif
                    },
                    criterio: {
                        id: cliente.id
                    }
                })
                getClientes()
                console.log(cliente)
                handleClose()
            }catch(error){
    
            }
     }
        useEffect(()=>{
            setNombre(cliente.nombre)
            setApellidos(cliente.apellidos)
            setTelefono(cliente.telefono)
            setEmail(cliente.email)
            setNif(cliente.nif)
        },[])
        return(
            <div>
                <InputComponent placeHolder='Nombre' setInputText={setNombre} text={nombre}></InputComponent>
                <InputComponent placeHolder='Apellidos' setInputText={setApellidos} text={apellidos}></InputComponent>
                <InputComponent placeHolder='Telefonos' setInputText={setTelefono} text={telefono}></InputComponent>
                <InputComponent placeHolder='Email' setInputText={setEmail} text={email}></InputComponent>
                <InputComponent placeHolder='Nif' setInputText={setNif} text={nif}></InputComponent>
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
    export default EditCliente