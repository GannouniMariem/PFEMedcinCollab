import React from "react";
import "./ButtonComponent.css";

function ButtonComponent({ button, type, onClick }) {
  return (
    <button type={type || "button"} onClick={onClick} className="btn">
      {button}
    </button>
  );
}

export default ButtonComponent;
