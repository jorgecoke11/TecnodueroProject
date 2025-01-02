import React from 'react';
import { useTable, useFilters, useSortBy, usePagination, useGlobalFilter } from 'react-table';

const ReactTable = ({ columns, data }) => {
    // Usa el hook useGlobalFilter
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows, // Los "rows" en react-table son todos los datos disponibles
        prepareRow,
        state: { pageIndex, pageSize, sortBy, globalFilter },
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter // Este es el hook correcto para setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },  // Estado inicial de la paginación
        },
        useFilters,
        useGlobalFilter, // Hook para el filtro global
        useSortBy,
        usePagination
    );

    return (
        <div className='div-data-table'>
            {/* Filtro global */}
            <div className='d-flex justify-content-between header-data-table'>
                <select
                    className='elegant-select'
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 15, 20].map(size => (
                        <option key={size} value={size}>
                            Mostrar {size}
                        </option>
                    ))}
                </select>
                <input
                className='elegant-input'
                    type="text"
                    value={globalFilter || ''}
                    onChange={e => setGlobalFilter(e.target.value)} // Cambiar filtro global
                    placeholder="Buscar..."
                    style={{ marginBottom: '10px' }}
                />
            </div>

            {/* Tabla */}
            <table className='table table-striped table-hover table-data-table' {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Indicador de ordenación */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' ⯆'  // Puedes reemplazar con el icono que prefieras
                                                : ' ⯅'  // También puedes cambiarlo por cualquier otro icono
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize).map(row => { // Paginación correcta
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td className='' {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Controles de paginación */}
            <div id='Pagination' className='d-flex justify-content-between pagination'>
                <div className='pagination-text'>
                    <span>
                        Página {pageIndex + 1} de {pageCount} 
                    </span>
                </div>
                <div>
                    <button  onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>
                    <button  onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>
                    <button  onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                    <button  onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ReactTable;
