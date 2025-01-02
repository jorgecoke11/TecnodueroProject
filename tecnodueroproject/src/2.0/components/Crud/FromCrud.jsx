import React from "react";
import DynamicForm from "../../components/BaseComponents/DynamicForm";
const FormCrud = ({fields, title, buttons, onSubmit}) => {

    const buttonsFormated = (
        <div className="d-flex justify-content-center gap-3">
            {buttons}
        </div>
    )
    return (
        <>
            {fields ? (
                <DynamicForm fields={fields} buttons={buttonsFormated} onSubmit={onSubmit} title={title}></DynamicForm>
            ) : (
                <p>Cargando datos...</p> // Mensaje de carga opcional
            )}
        </>
    );
};

export default FormCrud;
