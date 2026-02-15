// SearchInput.jsx
import React from 'react';

const SearchInput = ({ value, onChange, placeholder = "Search by title..." }) => {
  return (
    <input 
      type="text" 
      id="search"
      className="search-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;