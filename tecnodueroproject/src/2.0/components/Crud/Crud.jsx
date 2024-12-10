import React from "react";
import ReactTable from "../BaseComponents/ReactTable";

const Crud = ({ columns, data, addButton }) => {
    const styleAddButton = {
        padding: '0.5%'
    }
    return (
        <div>
            <div style={styleAddButton} className="d-flex justify-content-end">
                {addButton && addButton}
            </div>
            <ReactTable columns={columns} data={data} />
        </div>
    );
};

export default Crud;
