import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ActionButton from "../../../components/Buttons/ActionButton";
import clientes from "../../../../services/clientes";
import useUser from "../../../../hooks/useUser";
import ejecutablesServices from "../../../../services/ejecutables";
import FormCrud from "../FromCrud";
const EjecutablesFormCrud = ({action}) => {
    const { id, activeTab, idProcess} = useParams();
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
                    setTitleForm("¿Desea eliminar este ejecutable?")
                break;
                case "edit":
                    setTitleForm("Editar")
                    break;
                case "create":
                    setTitleForm("Crear cliente")
                    break;
            }
            let ejecutableData
            if(id && action == "edit" || action == "delete"){
                const response = await ejecutablesServices.getEjecutable(jwt, { whereGenerico:{
                    id: parseInt(id,10)
                } });
                ejecutableData =response
            }
            else{
                ejecutableData = {}
            }
            console.log(ejecutableData)
            setFields(getFields(isDelete, ejecutableData));
        } catch (error) {
            console.log("Error al obtener cliente:", error);
        }
    };
    const getFields  = (isDelete, ejecutableData) =>{
        const fields = [
            {
                required: true,
                disabled: isDelete,
                id: 'nombre',
                type: 'string',
                content: ejecutableData.nombre || '',
                label: 'Nombre'

            },
            {
                required:true,
                disabled: isDelete,
                id: 'ruta',
                type: 'string',
                content: ejecutableData.ruta || '',
                label: 'Ruta'
            }
        ]
        return fields
    }
    // const handleEditPost = async (formValues) => {
    //     try {
    //         console.log(formValues)
    //         await clientesServices.updateCliente(jwt, {
    //             nuevosDatos: formValues,
    //             criterio: {
    //                 id: id
    //             }
    //         })
    //         navegate("/clientes")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // const handleAddPost = async(formValues)=>{
    //     try{
    //         const response = await clientesServices.createCliente(jwt,{
    //             cliente: formValues
    //         })
    //         navegate("/clientes")
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
    // const handleDeletePost = async() =>{
    //     try{
    //         const response = await clientesServices.deleteCliente(jwt,{
    //             clienteId: id
    //         })
    //         navegate("/clientes")
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
    const handleSubmit = () => {
        // switch (action) {
        //   case 'edit':
        //     handleEditPost();
        //     break;
        //   case 'create':
        //     handleAddPost();
        //     break;
        //   case 'delete':
        //     handleDeletePost();
        //     break;
        //   default:
        //     console.warn('Acción no reconocida:', action);
        // }
      };
    const buttons = (
        <>
            <ActionButton type='button' className= "secondary-button" action={"/procesos/configuracion/" + activeTab + "/" + idProcess} >Cancelar</ActionButton>
            <ActionButton type='submit' className="main-button">Guardar</ActionButton>
        </>
    );

    return (
        <FormCrud buttons={buttons} onSubmit={handleSubmit} title={titleForm} fields={fields}></FormCrud>
    );
};

export default EjecutablesFormCrud;
