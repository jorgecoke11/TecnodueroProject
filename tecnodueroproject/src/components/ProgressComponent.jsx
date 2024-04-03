import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressComponent = ({ children }) => {
    return (
        <ProgressBar animated now={children} label={`${children}%`} />
    );
};

export default ProgressComponent;