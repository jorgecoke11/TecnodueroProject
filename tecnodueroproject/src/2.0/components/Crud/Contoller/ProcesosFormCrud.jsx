import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ActionButton from "../../../components/Buttons/ActionButton";
import ProcesosView from "../../Views/ProcessView";
import procesosServices from '../../../../services/Procesos'
import useUser from "../../../../hooks/useUser";
import clientesServices from "../../../../services/clientes";
const ProcesosFormCrud = ({action}) => {
    const { id } = useParams();
    const navegate = useNavigate();
    const { jwt } = useUser();
    useEffect(() => {
        getProceso();
    }, [id, jwt]);

    const getProceso = async () => {
        try {

            let clientData
            if(id && action == "edit" || action == "delete"){
                const response = await procesosServices.getProceso(jwt, { id });
                clientData = response[0] || {};
            }
            else{
                clientData = {}
            }
        } catch (error) {
            console.log("Error al obtener cliente:", error);
        }
    };
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
    const handleSubmit = () => {
        switch (action) {
          case 'edit':
            handleEditPost();
            break;
          case 'create':
            handleAddPost();
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
        <ProcesosView></ProcesosView>
    );
};

export default ProcesosFormCrud;
