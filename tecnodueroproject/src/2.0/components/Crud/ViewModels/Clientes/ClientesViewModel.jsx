import React, { useState, useEffect } from "react";
import Crud from "../../Crud";
import ActionButton from "../../../Buttons/ActionButton";
import clientesServices from '../../../../../services/clientes'
import useUser from "../../../../../hooks/useUser.js";
const ClientesViewModel = () => {
  const { jwt } = useUser();
  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    try {
      const response = await clientesServices.getClientes(jwt);
      setClientes(response); // Assuming response structure has a "data" property containing array of clients
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  }
  useEffect(() => {
    getClientes()
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
        Header: "Apellidos",
        accessor: "apellidos",
      },
      {
        Header: "Telefono",
        accessor: "telefono",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Documento",
        accessor: "nif",
      },
      {
        Header: "Acciones",
        accessor: "acciones",
      },
    ],
    []
  );

  const enrichedData = clientes.map((value) => ({
    ...value,
    acciones: (
      <>
        <ActionButton
          title={"Editar"}
          action={'/clientes/edit/' + value.id}
          className={"btn bi bi-pencil-square"}
        >
        </ActionButton>
        <ActionButton
          title={"Eliminar"}
          action={'/clientes/delete/' + value.id}
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

export default ClientesViewModel;
