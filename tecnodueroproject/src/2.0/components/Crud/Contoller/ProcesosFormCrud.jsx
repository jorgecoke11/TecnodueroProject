import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ActionButton from "../../../components/Buttons/ActionButton";
import useUser from "../../../../hooks/useUser";
import procesosServices from "../../../../services/Procesos";
import FormCrud from "../FromCrud";
const ProcesosFormCrud = ({ action }) => {
    const { id } = useParams();
    const navegate = useNavigate();
    const { jwt } = useUser();
    const [fields, setFields] = useState(null);
    const isDelete = action == "delete"
    const [titleForm, setTitleForm] = useState(null)
    useEffect(() => {
        getProceso();
    }, [id, jwt]);

    const getProceso = async () => {
        try {
            console.log(id)
            switch (action) {
                case "delete":
                    setTitleForm("¿Desea eliminar este proceso?")
                    break;
                case "edit":
                    setTitleForm("Editar")
                    break;
                case "create":
                    setTitleForm("Crear proceso")
                    break;
            }
            let procesosData
            if (id && action == "edit" || action == "delete") {
                const response = await procesosServices.getProceso(jwt, {

                    idRobot: parseInt(id, 10)
                });
                procesosData = response
            }
            else {
                procesosData = {}
            }
            console.log(procesosData)
            setFields(getFields(isDelete, procesosData));
        } catch (error) {
            console.log("Error al obtener cliente:", error);
        }
    };
    const getFields = (isDelete, procesosData) => {
        let fields = [
            {
                required: true,
                disabled: isDelete,
                id: 'Nombre',
                type: 'string',
                content: procesosData.Nombre || '',
                label: 'Nombre',
            }
        ];
        return fields;
    };

    const handleEditPost = async (formValues) => {
        try {
            console.log(formValues)
            const response = await procesosServices.updateProceso(jwt, {
                nuevosDatos: formValues,
                criterio: {
                    idRobot: id
                }
            })
            console.log(response)
            navegate("/procesos")
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddPost = async (formValues) => {
        try {
            console.log(formValues)
            const response = await procesosServices.createProceso(jwt, {
                nuevosDatos: formValues
            })
            console.log(response)
            navegate("/procesos")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeletePost = async () => {
        try {
            const response = await procesosServices.deleteProceso(jwt, {
                whereGenerico: {
                    idRobot: id
                }
            })
            navegate("/procesos/")
        } catch (error) {
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
            <ActionButton type='button' className="secondary-button" action={"/procesos/"} >Cancelar</ActionButton>
            <ActionButton type='submit' className="main-button">Guardar</ActionButton>
        </>
    );

    return (
        <FormCrud buttons={buttons} onSubmit={handleSubmit} title={titleForm} fields={fields}></FormCrud>
    );
};

export default ProcesosFormCrud;
