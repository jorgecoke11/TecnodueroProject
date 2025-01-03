import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ActionButton from "../../../components/Buttons/ActionButton";
import useUser from "../../../../hooks/useUser";
import parametrosServices from "../../../../services/parametros";
import FormCrud from "../FromCrud";
const ParametrosFormCrud = ({ action }) => {
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
                const response = await parametrosServices.getParametro(jwt, {
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
                id: 'codigo',
                type: 'string',
                content: ejecutableData.codigo || '',
                label: 'Código',
            },
            {
                required: true,
                disabled: isDelete,
                id: 'valor',
                type: 'string',
                content: ejecutableData.valor || '',
                label: 'Valor',
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
    }
    const handleAddPost = async (formValues) => {
    }
    const handleDeletePost = async () => {

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

export default ParametrosFormCrud;
