import React from 'react';
import './styles/Timeline.css';

const Timeline = () => {
  const milestones = [
    {
      title: 'Initial Concept Review',
      project: 'Living Room Redesign',
      date: 'Oct 28, 2023',
    },
    {
      title: 'Material Selection',
      project: 'Kitchen Renovation',
      date: 'Nov 5, 2023',
    },
  ];

  return (
    <div className="timeline">
      <h2>Project Timeline</h2>
      <p className="timeline-subtitle">Upcoming milestones</p>
      {milestones.map((item, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-line" />
          <div>
            <h3>{item.title}</h3>
            <p>{item.project}</p>
            <p className="timeline-date">📅 {item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
