import React, { useState, useEffect } from "react";
import moment from 'moment'
import { saveAs } from "file-saver";
import ProgressComponent from './ProgressComponent'
import casos from "../services/casos";
import useUser from "../hooks/useUser";
import { Link } from 'react-router-dom';
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
                        <th>Acción</th>
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
                                <Link className="btn btn-primary mb-3" to={`/Monitorizacion/ejecucion/${caso.idCaso}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-display" viewBox="0 0 16 16">
                                        <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145" />
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
