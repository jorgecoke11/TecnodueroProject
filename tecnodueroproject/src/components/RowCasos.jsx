import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const TableComponent = ({ data }) => {
    const [caso, setCaso] = useState([]);

    useEffect(() => {
        setCaso(data);
    }, [data]); // Actualiza el estado 'caso' cuando 'data' cambia
const convertToCSV = (array) => {
    console.log(array)
    if (!Array.isArray(array) || array.length === 0) {
        return ''; // Si el array es vacío o no es un array, devuelve una cadena vacía
    }
    
    const header = Object.keys(array[0]).join(",");
    const rows = array.map(obj => Object.values(obj).join(","));
    return header + "\n" + rows.join("\n");
};
    const handleDownload = (datos, nombre) => {
        const csvByteArray = Uint8Array.from(datos.data); // Convertir el arreglo de bytes en un Uint8Array
        const blobData = new Blob([csvByteArray], { type: 'text/csv' }); // Crear el Blob con el arreglo de bytes
        saveAs(blobData, nombre +'.csv');
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Caso</th>
                        <th>Estado</th>
                        <th>Nombre</th>
                        <th>Porcentaje</th>
                        <th>Datos</th>
                    </tr>
                </thead>
                <tbody>
                    {caso.map((caso, index) => (
                        <tr key={index}>
                            <td>{caso.idCaso}</td>
                            <td>{caso.nombreEstado}</td>
                            <td>{caso.nombreCaso}</td>
                            <td>{caso.porcentaje}</td>
                            <td><button className="btn btn-success" onClick={() => handleDownload(caso.datos, caso.nombreCaso)}>Download</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
