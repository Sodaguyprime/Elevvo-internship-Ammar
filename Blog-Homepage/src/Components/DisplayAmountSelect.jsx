// DisplayAmountSelect.jsx
const DisplayAmountSelect = ({ 
  value, 
  onChange, 
  options = [3, 6, 9],
  id = "DisplayAmount",
  className = "display-select"
}) => {
  return (
    <select 
      id={id} 
      className={className} 
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