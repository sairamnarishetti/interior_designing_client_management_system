// src/components/admin/Tabs.jsx
import React from 'react';
import './styles/Tabs.css';

const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = ['Revenue', 'Appointments', 'Clients', 'Tasks'];

  return (
    <div className="admin-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={activeTab === tab.toLowerCase() ? 'tab active' : 'tab'}
          onClick={() => onTabChange(tab.toLowerCase())}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
