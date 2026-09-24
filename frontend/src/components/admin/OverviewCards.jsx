// src/components/admin/OverviewCards.jsx
import React from 'react';
import './styles/OverviewCards.css';

const cards = [
  { label: 'Total Clients', value: 24 },
  { label: 'Revenue', value: '$52,500' },
  { label: 'Active Projects', value: 8 },
  { label: 'Appointments', value: 12 },
];

const OverviewCards = () => {
  return (
    <div className="overview-cards">
      {cards.map((card, index) => (
        <div className="overview-card" key={index}>
          <p className="card-label">{card.label}</p>
          <p className="card-value">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
