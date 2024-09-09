import React from "react";
import "./SelectComponent.css";

const SelectComponent = ({ label, options, value, onChange, className }) => {
  return (
    <div className={`select-container ${className}`}>
      {label && <label>{label}</label>}
      <select value={value} onChange={onChange}>
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
