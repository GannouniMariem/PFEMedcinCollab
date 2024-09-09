import React from "react";
import "./InputComponent.css";

function InputComponent({ label, placeholder, value, onChange, className }) {
  return (
    <div className={`input-container ${className}`}>
      {label && <label>{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputComponent;
