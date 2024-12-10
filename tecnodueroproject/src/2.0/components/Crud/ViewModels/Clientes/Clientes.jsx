import React, { useState } from "react";
import Crud from "../../Crud";
import ActionButton from "../../../Buttons/ActionButton";
import DynamicForm from "../../../BaseComponents/DynamicForm";
import { Navigate, useNavigate } from 'react-router-dom';

const TestCrud = () => {
  const navigate = useNavigate();
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
        Header: "Edad",
        accessor: "edad",
      },
      {
        Header: "Ciudad",
        accessor: "ciudad",
      },
      {
        Header: "Acciones",
        accessor: "acciones",
      },
    ],
    []
  );

  const [data, setData] = useState([
    { id: 1, nombre: "Juan Pérez", edad: 30, ciudad: "Madrid" },
    { id: 2, nombre: "María López", edad: 25, ciudad: "Barcelona" },
    { id: 3, nombre: "Carlos Gómez", edad: 40, ciudad: "Sevilla" },
  ]);

  // Función para editar una fila
  const editFunction = (id) => {
    const editData = data.find(d=> d.id === id) 
    console.log(editData)
    
    navigate('/prueba/edit/', {
      state: {
        id:2
      },
    });
  };

  const enrichedData = data.map((value) => ({
    ...value,
    acciones: (
      <ActionButton
        title={"Editar"}
        oncClick={() => editFunction(value.id)}
        className={"btn bi bi-pencil-square"}
      ></ActionButton>
    ),
  }));

  const Action = (
    <ActionButton
    className={'main-button'}
      oncClick={() => {
        alert("CLICK");
      }}
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

export default TestCrud;
