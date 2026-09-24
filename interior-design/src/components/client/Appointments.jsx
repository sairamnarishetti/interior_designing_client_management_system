import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Appointments.css';

const Appointments = () => {
  const navigate = useNavigate();

  const goToConsultation = () => {
    navigate('/consultation');
  };

  return (
    <div className="appointments-section">
      <div className="appointments-content">
        <div className="appointments-header">
          <h3>Upcoming Appointments</h3>
          <button className="schedule-btn" onClick={goToConsultation}>Schedule New</button>
        </div>

        <p className="sub-text">Your scheduled design meetings</p>

        <div className="appointment-card">
          <h4>Design Consultation</h4>
          <p>with Sarah Williams</p>
          <p>📅 Oct 25, 2023 — 10:00 AM</p>
          <div className="appointment-actions">
            <button onClick={goToConsultation}>Reschedule</button>
            <button onClick={goToConsultation}>View</button>
          </div>
        </div>

        <div className="appointment-card">
          <h4>Material Selection</h4>
          <p>with Michael Chen</p>
          <p>📅 Nov 2, 2023 — 2:30 PM</p>
          <div className="appointment-actions">
            <button onClick={goToConsultation}>Reschedule</button>
            <button onClick={goToConsultation}>View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
