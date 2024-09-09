import React from "react";
import moment from "moment";
import "./CustomToolbar.css";

const CustomToolbar = ({ label, onNavigate, onView, date }) => {
  const formattedLabel = moment(date).format("D MMM YYYY");

  return (
    <div className="custom-toolbar">
      <button className="add-button">+ Ajouter</button>

      <div className="navigation-buttons">
        <button
          className="custom-nav-button"
          onClick={() => onNavigate("PREV")}
        >
          &lt;
        </button>
        <span className="toolbar-label">{formattedLabel}</span>
        <button
          className="custom-nav-button"
          onClick={() => onNavigate("NEXT")}
        >
          &gt;
        </button>
      </div>

      <div className="view-buttons">
        <button className="view-button" onClick={() => onView("day")}>
          Jour
        </button>
        <button className="view-button" onClick={() => onView("week")}>
          Semaine
        </button>
        <button className="view-button" onClick={() => onView("month")}>
          Mois
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
