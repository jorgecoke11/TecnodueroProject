import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SelectMultipleComponent = (props) => {
    const { placeHolder, options, setOptionText } = props;
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(selectedValues);
        setOptionText(selectedValues);
    };

    return (
        <div className='container mt-3'>
            <select
                placeholder={placeHolder}
                className='form-control'
                onChange={handleInputChange}
                value={selectedOptions}
            >
                <option value="" disabled></option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectMultipleComponent;
