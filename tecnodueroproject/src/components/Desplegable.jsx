import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
function Dropdown({ children, label, onClick}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    onClick()
  };

  return (
    
    <div className='mt-3'>
      <Accordion onClick={toggleDropdown}>
            <Accordion.Item eventKey="0">
        <Accordion.Header>{label}</Accordion.Header>
        <Accordion.Body>
        {children}
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Dropdown;
