import React, { useState, useEffect } from "react";
import Crud from "../../Crud";
import ActionButton from "../../../Buttons/ActionButton";
import ejecutablesServices from '../../../../../services/ejecutables.js'
import useUser from "../../../../../hooks/useUser.js";
const EjecutablesViewModel = ({idProcess, activeTab}) => {
  const { jwt } = useUser();
  const [ejecutables, setEjecutables] = useState([]);

  const getEjecutables = async () => {
    try {
      const response = await ejecutablesServices.getEjecutables(jwt,{idRobot:idProcess});
      setEjecutables(response);
    } catch (error) {
      console.error("Error fetching procesos:", error);
    }
  }
  const conmutar = async (status,nombre) =>{
    try{
      const response = await ejecutablesServices.updateStatus(jwt, {status: status== 1 ? 0 : 1, criterio: nombre})
      getEjecutables();
    }catch(error){
      console.error("Error fetching procesos:", error);
    }
  }
  useEffect(() => {
    getEjecutables()
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // Clave del objeto
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Ruta",
        accessor: "ruta",
      },
      {
        Header: "Conmutador",
        accessor: "status"
      },
      {
        Header: "Acciones",
        accessor:"acciones"
      }
    ],
    []
  );

  const enrichedData = ejecutables.map((value) => ({
    ...value,
    status: (<div className={value.status == 0 ? "bordered-cell-on" : "bordered-cell-off"}>
        {value.status== 0 ? "ON" : "OFF"}
        </div>),
    acciones: (
      <>
        <ActionButton
          title={"Conmutar"}
          className={"btn bi bi-power"}
          oncClick={()=>conmutar(value.status, value.nombre)}
        >
        </ActionButton>
        <ActionButton
          title={"Eliminar"}
          action={'/ejecutables/delete/' + value.id + "/" + activeTab + "/" + idProcess}
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

export default EjecutablesViewModel;
