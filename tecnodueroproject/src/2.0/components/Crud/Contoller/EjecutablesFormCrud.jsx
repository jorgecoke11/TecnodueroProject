import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ActionButton from "../../../components/Buttons/ActionButton";
import useUser from "../../../../hooks/useUser";
import ejecutablesServices from "../../../../services/ejecutables";
import FormCrud from "../FromCrud";
const EjecutablesFormCrud = ({ action }) => {
    const { id, activeTab, idProcess } = useParams();
    const navegate = useNavigate();
    const { jwt } = useUser();
    const [fields, setFields] = useState(null);
    const isDelete = action == "delete"
    const [titleForm, setTitleForm] = useState(null)
    useEffect(() => {
        getEjecutable();
    }, [id, jwt]);

    const getEjecutable = async () => {
        try {
            switch (action) {
                case "delete":
                    setTitleForm("¿Desea eliminar este ejecutable?")
                    break;
                case "edit":
                    setTitleForm("Editar")
                    break;
                case "create":
                    setTitleForm("Crear ejecutable")
                    break;
            }
            let ejecutableData
            if (id && action == "edit" || action == "delete") {
                const response = await ejecutablesServices.getEjecutable(jwt, {
                    whereGenerico: {
                        id: parseInt(id, 10)
                    }
                });
                ejecutableData = response
            }
            else {
                ejecutableData = {}
            }
            setFields(getFields(isDelete, ejecutableData));
        } catch (error) {
            console.log("Error al obtener cliente:", error);
        }
    };
    const getFields = (isDelete, ejecutableData) => {
        let fields = [
            {
                required: true,
                disabled: isDelete,
                id: 'nombre',
                type: 'string',
                content: ejecutableData.nombre || '',
                label: 'Nombre',
            },
            {
                required: true,
                disabled: isDelete,
                id: 'ruta',
                type: 'string',
                content: ejecutableData.ruta || '',
                label: 'Ruta',
            },
        ];
    
        if (action === 'create') {
            fields.push({
                required: true,
                disabled: false,
                id: 'id_robot_fk',
                type: 'hidden',
                content: parseInt(idProcess,10),
                label: 'ID Robot',
            });
        }
        return fields;
    };
    
    const handleEditPost = async (formValues) => {
        try {
            console.log(formValues)
            await ejecutablesServices.updateEjecutable(jwt, {
                nuevosDatos: formValues,
                criterio: {
                    id: id
                }
            })
            navegate("/procesos/configuracion/" + activeTab + "/" + idProcess)
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddPost = async (formValues) => {
        try {
            const response = await ejecutablesServices.createEjecutable(jwt, {
                nuevosDatos: formValues
            })
            console.log(response)
            navegate("/procesos/configuracion/" + activeTab + "/" + idProcess)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeletePost = async () => {
        try {
            const response = await ejecutablesServices.deleteEjecutable(jwt, {
                whereGenerico: {
                    id: id
                }
            })
            navegate("/procesos/configuracion/" + activeTab + "/" + idProcess)
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
            <ActionButton type='button' className="secondary-button" action={"/procesos/configuracion/" + activeTab + "/" + idProcess} >Cancelar</ActionButton>
            <ActionButton type='submit' className="main-button">Guardar</ActionButton>
        </>
    );

    return (
        <FormCrud buttons={buttons} onSubmit={handleSubmit} title={titleForm} fields={fields}></FormCrud>
    );
};

export default EjecutablesFormCrud;
