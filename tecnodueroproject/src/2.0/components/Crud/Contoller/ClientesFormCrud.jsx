import React, { useState, useEffect } from "react";
import DynamicForm from "../../../components/BaseComponents/DynamicForm";
import { useParams } from "react-router-dom";
import ActionButton from "../../../components/Buttons/ActionButton";
import clientes from "../../../../services/clientes";  
import useUser from "../../../../hooks/useUser";
import clientesServices from "../../../../services/clientes";
const ClientesFormCrud = () => {
    const { id } = useParams();
    const { jwt } = useUser();
    const [data, setData] = useState(null);
    const [fields, setFields] = useState(null); // Cambiado para manejar la lista de fields directamente

    useEffect(() => {
        if (id) {
            getCliente();
        }
    }, [id, jwt]);

    const getCliente = async () => {
        try {
            const response = await clientes.getClientsConditions(jwt, { id });
            const clientData = response[0] || {};
            setData(clientData);
            setFields([
                {
                    type: 'string',
                    content: clientData.nombre || '',
                    label: 'Nombre'
                },
                {
                    type: 'string',
                    content: clientData.apellidos || '',
                    label: 'Apellidos'
                },
                {
                    type: 'number',
                    content: clientData.telefono || '',
                    label: 'Telefono'
                },
                {
                    type: 'string',
                    content: clientData.email || '',
                    label: 'Email'
                },
                {
                    type: 'string',
                    content: clientData.nif || '',
                    label: 'Documento'
                }
            ]);
        } catch (error) {
            console.log("Error al obtener cliente:", error);
        }
    };
    const handleEditPost = async (formValues) =>{
        try{
            console.log(formValues)
            await clientesServices.updateCliente(jwt,{
                nuevosDatos:formValues,
                criterio: {
                    id: id
                }
            })

        }catch(error){
            console.log(error)
        }
 }

    const buttons = <ActionButton className="main-button">Guardar</ActionButton>;

    return (
        <>
            {fields ? (
                <DynamicForm fields={fields} buttons={buttons} onSubmit={handleEditPost}></DynamicForm>
            ) : (
                <p>Cargando datos...</p> // Mensaje de carga opcional
            )}
        </>
    );
};

export default ClientesFormCrud;
