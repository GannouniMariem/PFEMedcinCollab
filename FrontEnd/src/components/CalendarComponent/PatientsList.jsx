import React, { useState } from "react";
import "./PatientsList.css";
import { FaSearch } from "react-icons/fa"; // Assure-toi d'installer react-icons

const PatientsList = () => {
  const [patients] = useState([
    "Jessie Whelan",
    "Abdullahi Osborne",
    "Jillian Haynes",
    "Maegan Monroe",
    "Halimah Dawe",
    "Lydia Love",
    "Billy-Joe Mcghee",
    "Lillian Huffman",
    "Nikola Snider",
    "Calista Lutz",
    "Bianka Booker",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const filteredPatients = currentPatients.filter((patient) =>
    patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="patients-container">
      <h2 className="title">Mes patients</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Chercher un patient"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="search-icon" />
      </div>
      <ul className="patients-list">
        {filteredPatients.map((patient, index) => (
          <li key={index} className="patient-item">
            {patient}
          </li>
        ))}
      </ul>
      <button className="add-patient-button">+ Ajouter un patient</button>
      <div className="pagination">
        {[...Array(Math.ceil(patients.length / patientsPerPage)).keys()].map(
          (num) => (
            <button
              key={num}
              onClick={() => paginate(num + 1)}
              className={`page-number ${
                currentPage === num + 1 ? "active" : ""
              }`}
            >
              {num + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PatientsList;
