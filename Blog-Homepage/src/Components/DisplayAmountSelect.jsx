// DisplayAmountSelect.jsx
import React from 'react';

const DisplayAmountSelect = ({ value, onChange, options = [3, 6, 9] }) => {
  return (
    <select 
      id="DisplayAmount" 
      className="display-select" 
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DisplayAmountSelect;