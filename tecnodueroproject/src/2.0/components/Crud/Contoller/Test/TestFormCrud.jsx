import React from "react";
import DynamicForm from "../../../BaseComponents/DynamicForm";
import { useParams } from "react-router-dom";
import ActionButton from "../../../Buttons/ActionButton";
const TestFormCrud = () => {
    const { id } = useParams();
    const data = { id: 1, nombre: "Juan Pérez", edad: 30, ciudad: "Madrid" }
    let fields = [
        {
            type: 'number',
            content: id === undefined ? '' : data.id,
            label: 'ID'
        },
        {
            type: 'string',
            content: id === undefined ? '' : data.nombre,
            label: 'Nombre'
        },
    
    ]
    const buttons = <ActionButton className="main-button">Guardar</ActionButton>;
    return (
        <DynamicForm fields={fields} buttons={buttons}></DynamicForm>
    )
}
export default TestFormCrud