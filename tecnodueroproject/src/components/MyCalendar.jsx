import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

    const onChange = (selectedDate) => {
      setDate(selectedDate);
      onDateChange(selectedDate); // Llama a la función de devolución de llamada con la fecha seleccionada
    };

  return (
    <div>
        <Calendar
          onChange={onChange}
          value={date}
        />
      <p>Fecha seleccionada: {date.toLocaleDateString()}</p>
    </div>
  );
};

export default MyCalendar;
