import React from "react";
import NavbarPrinc from "../../components/NavbarPincipale/NavbarPrinc";
import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import PatientsList from "../../components/CalendarComponent/PatientsList";
import NextAppointment from "../../components/CalendarComponent/NextAppointment";
import "./dashboard.css";

const Dashboard = () => (
  <div className="dashboard-container">
    {/* <NavbarPrinc /> */}
    <div className="dashboard-content">
      <div className="main-content">
        <NextAppointment />{" "}
        {/* Placer NextAppointment au-dessus du calendrier */}
        <CalendarComponent />
      </div>

      <PatientsList />
    </div>
  </div>
);

export default Dashboard;