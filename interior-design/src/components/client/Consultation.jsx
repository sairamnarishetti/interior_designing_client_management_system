import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Make sure the path is correct
import './styles/Consultation.css';

const Consultation = () => {
  const [designer, setDesigner] = useState('');
  const [consultationType, setConsultationType] = useState('Video Call');
  const [projectType, setProjectType] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBooking = () => {
    console.log({
      designer,
      consultationType,
      projectType,
      projectDetails,
      selectedDate,
      selectedTime,
    });
    alert('Consultation booked!');
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <div className="consultation-container">
          {/* Left: Form */}
          <div className="consultation-form">
            <h2>Schedule Your Consultation</h2>
            <p>Select your preferred date, time, and designer</p>

            {/* Designer Selection */}
            <label>Choose a Designer</label>
            <select value={designer} onChange={(e) => setDesigner(e.target.value)}>
              <option value="">Select a designer</option>
              <option value="Sarah">Sarah Williams</option>
              <option value="Michael">Michael Chen</option>
            </select>

            {/* Consultation Type */}
            <label>Consultation Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="consultation"
                  value="Video Call"
                  checked={consultationType === 'Video Call'}
                  onChange={(e) => setConsultationType(e.target.value)}
                />
                Video Call
              </label>
              <label>
                <input
                  type="radio"
                  name="consultation"
                  value="Phone Call"
                  checked={consultationType === 'Phone Call'}
                  onChange={(e) => setConsultationType(e.target.value)}
                />
                Phone Call
              </label>
              <label>
                <input
                  type="radio"
                  name="consultation"
                  value="In-Person"
                  checked={consultationType === 'In-Person'}
                  onChange={(e) => setConsultationType(e.target.value)}
                />
                In-Person
              </label>
            </div>

            {/* Date Picker */}
            <label>Choose a Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            {/* Time Slots */}
            <label>Available Time Slots</label>
            <div className="time-slots">
              {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                <button
                  key={time}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Project Type */}
            <label>Project Type</label>
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
              <option value="">Select project type</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Remodeling">Remodeling</option>
              <option value="Furniture Selection">Furniture Selection</option>
            </select>

            {/* Project Details */}
            <label>Project Details</label>
            <textarea
              placeholder="Tell us more about your project, goals, and any specific requirements..."
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
            />

            <button className="book-button" onClick={handleBooking}>
              Book Consultation
            </button>
          </div>

          {/* Right: Sidebar */}
          <div className="consultation-sidebar">
            <h3>What to Expect</h3>
            <ul>
              <li>
                <strong>Meet Your Designer</strong>
                <br />
                Connect with a professional who specializes in your project type
              </li>
              <li>
                <strong>Discuss Your Vision</strong>
                <br />
                Share your ideas, requirements, and inspiration
              </li>
              <li>
                <strong>Timeline & Budget</strong>
                <br />
                Get insights on timeline and cost
              </li>
              <li>
                <strong>Next Steps</strong>
                <br />
                Determine how to proceed
              </li>
            </ul>
            <p className="note">
              Consultations typically last 30–45 minutes. Come prepared with questions, photos, and
              ideas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
