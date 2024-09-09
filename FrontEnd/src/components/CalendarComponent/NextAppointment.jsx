import React from "react";
import "./NextAppointment.css"; // Create a separate CSS file for styling

const NextAppointment = () => {
  return (
    <div className="appointment-container">
      <span className="icon-hourglass">⏳</span>
      <span className="appointment-text">
        Prochain rendez-vous :{" "}
        <a href="#0" className="appointment-link">
          Rdv de contrôle Amber D.
        </a>
      </span>
      <div className="appointment-details">
        <span className="icon-user">👤</span>
        <span className="appointment-name">Amber Durand</span>
        <span className="icon-clock">🕒</span>
        <span className="appointment-time">15:30</span>
      </div>
    </div>
  );
};

export default NextAppointment;
