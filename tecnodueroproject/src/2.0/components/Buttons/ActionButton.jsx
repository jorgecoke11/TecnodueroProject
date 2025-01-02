import React from "react";
import CustomButton from "../BaseComponents/CustomButton";
import { useNavigate } from 'react-router-dom';
const ActionButton = ({ className, children, oncClick, title, action, type}) => {
    const navigate = useNavigate();
    const onClickAction = () => {
        if (oncClick) {
            oncClick(); // Llama a la función pasada como prop si existe
        }
        if (action) {
            navigate(action); // Navega si existe una acción definida
        }
    };

    return (
        <CustomButton title={title} className={className} onClick={onClickAction} type={type}>
            {children}
        </CustomButton>
    );
};

export default ActionButton;
