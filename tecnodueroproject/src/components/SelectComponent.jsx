import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SelectComponent = (props) =>{
    const {placeHolder, options, setOptionText} = props
    const [selectedOption, setSelectedOption] = useState('');
    const handleInputChange = (event)=>{
        setSelectedOption(event.target.value);
        setOptionText(event.target.value)
    }
    return(
        <div className='container mt-3'>
            <select 
                placeholder={placeHolder} 
                className='form-control'
                onChange={handleInputChange}
                value={selectedOption}
                >
            <option value="" disabled></option>
                {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
        ))}
            </select>
        </div>
    )
}
export default SelectComponent