import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
const DynamicForm = ({fields, buttons, onSubmit, title}) => {

  const [formValues, setFormValues] = useState(fields);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    

    setFormValues((prevValues) =>
      prevValues.map((field) =>
        field.label === name
          ? {
              ...field,
              content: type === "checkbox" ? checked : type === "number" ? parseFloat(value) || "" : value,
            }
          : field
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formValues);
    const newData = formValues.reduce((acc, { id, content }) => {
      acc[id] = content; 
      return acc;
  }, {});
    onSubmit(newData)
  };

  const renderField = (value) => {
    if (value.type === 'hidden') {
      return (
        <div key={value.label} style={{ marginBottom: '10px', display: "none" }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>{value.label}:</label>
          <input
          disabled={value.disabled || false}
            required= {value.required || false}
            type="hidden"
            className='elegant-input'
            name={value.label}
            value={value.content}
            onChange={handleChange}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
      );
    }
    if (value.type === 'number') {
      return (
        <div key={value.label} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>{value.label}:</label>
          <input
          disabled={value.disabled || false}
            required= {value.required || false}
            type="number"
            className='elegant-input'
            name={value.label}
            value={value.content}
            onChange={handleChange}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
      );
    }
    if (value.type === 'string') {
      return (
        <div key={value.label} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>{value.label}:</label>
          {value.length > 50 ? (
            <textarea
            disabled={value.disabled || false}
            required= {value.required || false}
              name={value.label}
              value={value.content}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px', minHeight: '80px' }}
            />
          ) : (
            <input
            disabled={value.disabled || false}
            required= {value.required || false}
              type="text"
              className='elegant-input'
              name={value.label}
              value={value.content}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          )}
        </div>
      );
    }
    if (value.type === 'boolean') {
      return (
        <div key={value.label} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>
            <input
            disabled={value.disabled || false}
            required= {value.required || false}
              type="checkbox"
              name={value.label}
              checked={value.content}
              onChange={handleChange}
              style={{ marginRight: '5px' }}
            />
            {value.label}
          </label>
        </div>
      );
    }

    return (
      <div key={value.label} style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>{value.label}:</label>
        <input
        disabled={value.disabled || false}
        required= {value.required || false}
          type="text"
          name={value.label}
          value={value.content}
          onChange={handleChange}
          style={{ width: '100%', padding: '5px' }}
        />
      </div>
    );
  };

  return (
   
    <form onSubmit={handleSubmit} className='elegant-form'>
       <h2 style={{ marginBottom: "15px" }}>{title}</h2>
      {formValues.map((value) => renderField(value))}
      {buttons}
    </form>
  );
};

export default DynamicForm;
