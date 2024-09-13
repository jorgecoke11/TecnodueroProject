import React, { useEffect, useState } from 'react';
import useUser from "../../hooks/useUser.js";
import Dropdown from '../Desplegable';
import trazasServices from '../../services/traza.js';
import Table from 'react-bootstrap/esm/Table';

const Trazas = ({ id_caso_fk }) => {
    const [trazas, setTrazas] = useState([]);
    const { jwt } = useUser();

    const getTrazas = async () => {
        try {
            const response = await trazasServices.getTrazas(jwt, { id_caso_fk });
            setTrazas(response || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTrazas();
    }, []);

    return (
        <div>
            <Dropdown label='Trazas' onClick={() => getTrazas()}>
                <Table>
                    <thead>
                        <tr>
                            <th>Mensaje</th>
                            <th>Ejecutor</th>
                            <th>Foto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trazas.length > 0
                            ? trazas.map((traza) => (
                                <tr key={traza.id}>
                                    <td>{traza.mensaje}</td>
                                    <td>{traza.ejecutor}</td>
                                    {traza.ruta_foto != null
                                            ? <img src={`http://localhost:8000${traza.ruta_foto}`} alt="Captura" style={{ width: '600px', height: 'auto' }} />
                                            : <label>No hay capturas</label>}
                                </tr>
                            ))
                            : <tr><td colSpan="2"><b>No hay trazas</b></td></tr>}
                    </tbody>
                </Table>
            </Dropdown>
        </div>
    );
};

export default Trazas;
