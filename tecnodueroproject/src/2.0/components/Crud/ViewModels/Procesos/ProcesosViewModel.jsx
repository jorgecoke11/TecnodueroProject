import React, { useState, useEffect } from "react";
import Crud from "../../Crud";
import ActionButton from "../../../Buttons/ActionButton";
import procesosServices from '../../../../../services/Procesos.js'
import useUser from "../../../../../hooks/useUser.js";
const ProcesosViewModel = () => {
  const { jwt } = useUser();
  const [procesos, setProcesos] = useState([]);

  const getProcesos = async () => {
    try {
      const response = await procesosServices.getProcesos(jwt);
      setProcesos(response);
    } catch (error) {
      console.error("Error fetching procesos:", error);
    }
  }
  useEffect(() => {
    getProcesos()
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "idRobot", // Clave del objeto
      },
      {
        Header: "Nombre",
        accessor: "Nombre",
      },
      {
        Header: "Conmutador",
        accessor: "conmutador",
      },
      {
        Header: "Acciones",
        accessor: "acciones"
      }
    ],
    []
  );

  const enrichedData = procesos.map((value) => ({
    ...value,
    conmutador: (<div className={value.conmutador == 1 ? "bordered-cell-on" : "bordered-cell-off"}>
        {value.conmutador== 1 ? "ON" : "OFF"}
        </div>),
    acciones: (
      <>
        <ActionButton
          title={"Editar"}
          action={'/procesos/configuracion/' + value.idRobot}
          className={"btn bi bi-pencil-square"}
        >
        </ActionButton>
        <ActionButton
          title={"Eliminar"}
          action={'/clientes/delete/' + value.idRobot}
          className={"btn bi bi-trash3-fill"}
        ></ActionButton>
      </>
    ),
  }));

  const Action = (
    <ActionButton
      className={'main-button'}
      action='/clientes/create'
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

export default ProcesosViewModel;
