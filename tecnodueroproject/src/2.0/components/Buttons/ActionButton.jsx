import React from "react";
import CustomButton from "../BaseComponents/CustomButton";

const ActionButton = ({ className, children, oncClick, title }) => {
    return (
        <CustomButton title={title} className={className} onClick={oncClick}>
            {children}
        </CustomButton>
    );
};

export default ActionButton;
