import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar";
import "moment/locale/fr";
import "./CalendarComponent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientsList from "./PatientsList";

moment.locale("fr");

const localizer = momentLocalizer(moment);

const initialPatients = [
  {
    name: "Patient 1",
    dob: "",
    phone: "",
    email: "",
    lastExam: "",
    antecedents: "",
  },
  {
    name: "Patient 2",
    dob: "",
    phone: "",
    email: "",
    lastExam: "",
    antecedents: "",
  },
  {
    name: "Patient 3",
    dob: "",
    phone: "",
    email: "",
    lastExam: "",
    antecedents: "",
  },
];

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  // const [eventColor, setEventColor] = useState("#FF0000");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState("month");
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [newPatient, setNewPatient] = useState({
    name: "",
    dob: new Date(),
    phone: "",
    email: "",
    lastExam: new Date(),
    antecedents: "",
  });
  const [startTime, setStartTime] = useState("19:00");
  const [endTime, setEndTime] = useState("20:00");
  const [showPatientsList, setShowPatientsList] = useState(false);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
    resetEventDetails();
  };

  const handleSelectEvent = (event) => {
    setShowModal(true);
    setSelectedEvent(event);
    setEventTitle(event.title);
    setEventDescription(event.description);
    // setEventColor(event.color);
    setSelectedPatient(event.patient);
    setStartTime(moment(event.start).format("HH:mm"));
    setEndTime(moment(event.end).format("HH:mm"));
    setSelectedDate(event.start);
  };

  const resetEventDetails = () => {
    setEventTitle("");
    setEventDescription("");
    // setEventColor("#FF0000");
    setSelectedPatient("");
    setStartTime("19:00");
    setEndTime("20:00");
  };

  const saveEvent = () => {
    if (eventTitle && eventDescription && selectedDate && selectedPatient) {
      const start = moment(
        `${moment(selectedDate).format("YYYY-MM-DD")} ${startTime}`
      ).toDate();
      const end = moment(
        `${moment(selectedDate).format("YYYY-MM-DD")} ${endTime}`
      ).toDate();

      const eventToSave = {
        title: eventTitle,
        description: eventDescription,
        // color: eventColor,
        patient: selectedPatient,
        start,
        end,
      };

      if (selectedEvent) {
        const updatedEvents = events.map((event) =>
          event === selectedEvent ? { ...event, ...eventToSave } : event
        );
        setEvents(updatedEvents);
      } else {
        setEvents([...events, eventToSave]);
      }

      closeModal();
    }
  };

  const deleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event !== selectedEvent));
      closeModal();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    resetEventDetails();
    setSelectedEvent(null);
  };

  const eventPropGetter = (event) => ({
    style: {
      backgroundColor: "transparent",
      border: "none",
      color: "black",
      padding: "5px",
      borderRadius: "5px",
      fontWeight: "bold",
      position: "relative",
    },
  });

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleAddPatient = () => {
    if (
      newPatient.name &&
      newPatient.dob &&
      newPatient.phone &&
      newPatient.email &&
      newPatient.lastExam &&
      newPatient.antecedents
    ) {
      setPatients([...patients, newPatient]);
      setNewPatient({
        name: "",
        dob: new Date(),
        phone: "",
        email: "",
        lastExam: new Date(),
        antecedents: "",
      });
      setShowPatientModal(false);
    }
  };

  const handleShowPatientsList = () => {
    setShowPatientsList(true);
  };

  return (
    <div style={{ height: "700px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventPropGetter}
        view={currentView}
        onView={handleViewChange}
        components={{
          toolbar: (props) => (
            <CustomToolbar {...props} onView={handleViewChange} />
          ),
        }}
        views={["month", "week", "day"]}
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedEvent ? "Modifier RDV" : "Ajouter un RDV"}
                </h5>
                <button
                  type="button"
                  className="close-button"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="eventTitle" className="form-label">
                    Titre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>

                <div className="form-group date-time-container">
                  <label htmlFor="date" className="form-label">
                    Temps:
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control date-picker"
                  />
                  <select
                    id="startTime"
                    className="form-control time-picker"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option
                        key={i}
                        value={`${i.toString().padStart(2, "0")}:00`}
                      >
                        {`${i.toString().padStart(2, "0")}:00`}
                      </option>
                    ))}
                  </select>
                  <select
                    id="endTime"
                    className="form-control time-picker"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option
                        key={i}
                        value={`${i.toString().padStart(2, "0")}:00`}
                      >
                        {`${i.toString().padStart(2, "0")}:00`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="selectedPatient" className="form-label">
                    Patient:
                  </label>
                  <select
                    id="selectedPatient"
                    className="form-control"
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                  >
                    <option value="">Sélectionner un patient</option>
                    {patients.map((patient, index) => (
                      <option key={index} value={patient.name}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setShowPatientModal(true)}
                  >
                    Ajouter un nouveau patient
                  </button>
                </div>

                <div className="form-group">
                  <label htmlFor="eventDescription" className="form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="eventDescription"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* <div className="form-group">
                  <label htmlFor="eventColor" className="form-label">
                    Couleur:
                  </label>
                  <input
                    type="color"
                    id="eventColor"
                    className="form-control"
                    value={eventColor}
                    onChange={(e) => setEventColor(e.target.value)}
                  />
                </div> */}
              </div>
              <div className="modal-footer">
                {selectedEvent && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={deleteEvent}
                  >
                    Supprimer
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveEvent}
                >
                  {selectedEvent ? "Enregistrer les modifications" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPatientModal && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un Nouveau Patient</h5>
                <button
                  type="button"
                  className="close-button"
                  onClick={() => setShowPatientModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="patientName" className="form-label">
                    Nom:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientName"
                    value={newPatient.name}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patientDob" className="form-label">
                    Date de naissance:
                  </label>
                  <DatePicker
                    selected={newPatient.dob}
                    onChange={(date) =>
                      setNewPatient({ ...newPatient, dob: date })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control date-picker"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patientPhone" className="form-label">
                    Téléphone:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientPhone"
                    value={newPatient.phone}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, phone: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patientEmail" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="patientEmail"
                    value={newPatient.email}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patientLastExam" className="form-label">
                    Dernier Examen:
                  </label>
                  <DatePicker
                    selected={newPatient.lastExam}
                    onChange={(date) =>
                      setNewPatient({ ...newPatient, lastExam: date })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control date-picker"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patientAntecedents" className="form-label">
                    Antécédents:
                  </label>
                  <textarea
                    className="form-control"
                    id="patientAntecedents"
                    value={newPatient.antecedents}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        antecedents: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPatientModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddPatient}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPatientsList && (
        <PatientsList
          patients={patients}
          onClose={() => setShowPatientsList(false)}
        />
      )}

      {/* <button
        type="button"
        className="btn btn-info btn-lg"
        onClick={handleShowPatientsList}
      >
        Voir la liste des patients
      </button> */}
    </div>
  );
};

export default CalendarComponent;
