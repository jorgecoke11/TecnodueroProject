import React, { useState, useEffect } from "react";
import Crud from "../../Crud";
import ActionButton from "../../../Buttons/ActionButton";
import parametrosServices from '../../../../../services/parametros.js'
import useUser from "../../../../../hooks/useUser.js";
const ParametrosViewModel = ({ idProcess, activeTab }) => {
    const { jwt } = useUser();
    const [parametros, setParametros] = useState([]);

    const getParametros = async () => {
        try {
            const response = await parametrosServices.getParametros(jwt, { idRobot: idProcess });
            setParametros(response);
        } catch (error) {
            console.error("Error fetching procesos:", error);
        }
    }
    useEffect(() => {
        getParametros()
    }, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id", // Clave del objeto
            },
            {
                Header: "Código",
                accessor: "codigo",
            },
            {
                Header: "Valor",
                accessor: "valor",
            },
            {
                Header: "Acciones",
                accessor: "acciones"
            }
        ],
        []
    );

    const enrichedData = parametros.map((value) => ({
        ...value,
        codigo: (<b>
            {value.codigo}
        </b>),
        acciones: (
            <>
                <ActionButton
                    title={"Editar"}
                    className={"btn bi bi-pencil-square"}
                    action={'/parametros/edit/' + value.id + "/" + activeTab + "/" + idProcess}
                >
                </ActionButton>
                <ActionButton
                    title={"Eliminar"}
                    action={'/parametros/delete/' + value.id + "/" + activeTab + "/" + idProcess}
                    className={"btn bi bi-trash3-fill"}
                ></ActionButton>
            </>
        ),
    }));

    const Action = (
        <ActionButton
            className={'main-button'}
            action={'/ejecutables/create/' + activeTab + "/" + idProcess}
        >
            Añadir
        </ActionButton>
    );

    return (
        <>
            <Crud columns={columns} data={enrichedData} addButton={Action}></Crud>
        </>
    );
};

export default ParametrosViewModel;
