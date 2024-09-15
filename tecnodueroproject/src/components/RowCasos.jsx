import React, { useState, useEffect } from "react";
import moment from 'moment'
import { saveAs } from "file-saver";
import ProgressComponent from './ProgressComponent'
import casos from "../services/casos";
import ejecuciones from "../services/ejecuciones";
import useUser from "../hooks/useUser";
import { Link } from 'react-router-dom';
import Constantes from "../js/Constantes";
const TableComponent = ({ data }) => {
    const [caso, setCaso] = useState([]);
    const { jwt } = useUser()
    useEffect(() => {

        setCaso(data);
    }, [data]); // Actualiza el estado 'caso' cuando 'data' cambia

    const handleDownload = (datos, nombre) => {
        const csvByteArray = Uint8Array.from(datos.data); // Convertir el arreglo de bytes en un Uint8Array
        const blobData = new Blob([csvByteArray], { type: 'text/csv' }); // Crear el Blob con el arreglo de bytes
        saveAs(blobData, nombre + '.csv');
    };
    const handleRevivir = async (idCaso) => {
        try {
            const response = await casos.updateEstado(jwt, {
                idCaso,
                nuevoEstado: 5
            })
            const responseEjecucion = await ejecuciones.revivirUltimaEjecucion(jwt,{
                id_caso_fk: idCaso,
                id_estado_fk: Constantes.EJECUCIONES_SIN_ASIGNAR
            })
            setCaso(prevCaso => prevCaso.map(c => c.idCaso === idCaso ? { ...c, nombreEstado: 'En cola' } : c));
        } catch (error) {
            console.log('ERROR: error al revivir el caso')
        }
    }

    return (
        <div style={{ maxHeight: "300px", overflowY: "auto" }}> {/* Aplicar estilos CSS para hacer el componente desplazable */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID Caso</th>
                        <th>Estado</th>
                        <th>Nombre</th>
                        <th>Porcentaje</th>
                        <th>Fecha creacion</th>
                        <th>Fecha inicio</th>
                        <th>Fecha fin</th>
                        <th>Datos</th>
                        <th>Acciones</th>   
                    </tr>
                </thead>
                <tbody>
                    {caso.map((caso, index) => (
                        <tr key={index} className={caso.nombreEstado === 'En cola' ? 'encola' : ''}>
                            <td>{caso.idCaso}</td>
                            <td>{caso.nombreEstado}</td>
                            <td>{caso.nombreCaso}</td>
                            <td> <ProgressComponent>{caso.porcentaje}</ProgressComponent> </td>
                            <td>{moment(caso.fh_creacion).format('DD-MM-YYYY HH:mm:ss')}</td>
                            <td>{moment(caso.fh_comienzo).format('DD-MM-YYYY HH:mm:ss')}</td>
                            <td>{moment(caso.fh_fin).format('DD-MM-YYYY HH:mm:ss')}</td>
                            <td>
                                {caso.datos.data.length !== 1 ? (
                                    <button className="btn btn-success" onClick={() => handleDownload(caso.datos, caso.nombreCaso)}>Download</button>
                                ) : (
                                    <button className="btn btn-success" disabled>No disponible</button>
                                )}
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleRevivir(caso.idCaso)}>Revivir</button>
                            </td>
                            <td>
                                <Link className="btn btn-primary mb-3" to={`/Monitorizacion/ejecucion/${caso.idCaso}` } target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
