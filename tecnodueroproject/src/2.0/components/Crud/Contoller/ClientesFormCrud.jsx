import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ActionButton from "../../../components/Buttons/ActionButton";
import clientes from "../../../../services/clientes";
import useUser from "../../../../hooks/useUser";
import clientesServices from "../../../../services/clientes";
import FormCrud from "../FromCrud";
const ClientesFormCrud = ({action}) => {
    const { id } = useParams();
    const navegate = useNavigate();
    const { jwt } = useUser();
    const [fields, setFields] = useState(null);
    const isDelete = action == "delete"
    const [titleForm, setTitleForm] = useState(null)
    useEffect(() => {
            getCliente();
    }, [id, jwt]);

    const getCliente = async () => {
        try {
            switch(action){
                case "delete":
                    setTitleForm("¿Desea eliminar este cliente?")
                break;
                case "edit":
                    setTitleForm("Editar")
                    break;
                case "create":
                    setTitleForm("Crear cliente")
                    break;
            }
            let clientData
            if(id && action == "edit" || action == "delete"){
                const response = await clientes.getClientsConditions(jwt, { id });
                clientData = response[0] || {};
            }
            else{
                clientData = {}
            }
            setFields(getFields(isDelete, clientData));
        } catch (error) {
            console.log("Error al obtener cliente:", error);
        }
    };
    const getFields  = (isDelete, clientData) =>{
        const fields = [
            {
                required: true,
                disabled: isDelete,
                id: 'nombre',
                type: 'string',
                content: clientData.nombre || '',
                label: 'Nombre'

            },
            {
                disabled: isDelete,
                id: 'apellidos',
                type: 'string',
                content: clientData.apellidos || '',
                label: 'Apellidos'
            },
            {
                disabled: isDelete,
                id: 'telefono',
                type: 'number',
                content: clientData.telefono || '',
                label: 'Telefono'
            },
            {
                disabled: isDelete,
                id: 'email',
                type: 'string',
                content: clientData.email || '',
                label: 'Email'
            },
            {
                disabled: isDelete,
                id: 'nif',
                type: 'string',
                content: clientData.nif || '',
                label: 'Documento'
            }
        ]
        return fields
    }
    const handleEditPost = async (formValues) => {
        try {
            console.log(formValues)
            await clientesServices.updateCliente(jwt, {
                nuevosDatos: formValues,
                criterio: {
                    id: id
                }
            })
            navegate("/clientes")
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddPost = async(formValues)=>{
        try{
            const response = await clientesServices.createCliente(jwt,{
                cliente: formValues
            })
            navegate("/clientes")
        }catch(error){
            console.log(error)
        }
    }
    const handleDeletePost = async() =>{
        try{
            const response = await clientesServices.deleteCliente(jwt,{
                clienteId: id
            })
            navegate("/clientes")
        }catch(error){
            console.log(error)
        }
    }
    const handleSubmit = (formValues) => {
        switch (action) {
          case 'edit':
            handleEditPost(formValues);
            break;
          case 'create':
            handleAddPost(formValues);
            break;
          case 'delete':
            handleDeletePost();
            break;
          default:
            console.warn('Acción no reconocida:', action);
        }
      };
    const buttons = (
        <>
            <ActionButton type='button' className= "secondary-button" action="/clientes" >Cancelar</ActionButton>
            <ActionButton type='submit' className="main-button">Guardar</ActionButton>
        </>
    );

    return (
        <FormCrud buttons={buttons} onSubmit={handleSubmit} title={titleForm} fields={fields}></FormCrud>
    );
};

export default ClientesFormCrud;
