// src/components/admin/RecentClients.jsx
import React from 'react';
import './styles/RecentClients.css';

const RecentClients = () => {
  const clients = [
    {
      name: 'Sarah Johnson',
      project: 'Full Home',
      status: 'In Progress',
    },
    {
      name: 'Michael Chen',
      project: 'Kitchen Remodel',
      status: 'Completed',
    },
    {
      name: 'Emma Thompson',
      project: 'Living Room',
      status: 'Consultation',
    },
  ];

  return (
    <div className="recent-clients-card">
      <h3>Recent Clients</h3>
      <ul>
        {clients.map((client, index) => (
          <li key={index}>
            <strong>{client.name}</strong>
            <p>{client.project} — <span className={`status ${client.status.toLowerCase().replace(" ", "-")}`}>{client.status}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentClients;
