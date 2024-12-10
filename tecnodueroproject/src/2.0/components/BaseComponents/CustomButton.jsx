import React from "react";

const CustomButton = ({ label, onClick, className, children, title,...props }) => {
    return (
        <button className={` ${className}`} title={title} onClick={onClick} {...props}>

            {label ||children}
        </button>
    )
}
export default CustomButton