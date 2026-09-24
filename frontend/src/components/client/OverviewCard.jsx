import React from 'react';
import './styles/OverviewCard.css';

const OverviewCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="overview-card" style={{ backgroundColor: bgColor }}>
      <div className="icon">{icon}</div>
      <div className="details">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
