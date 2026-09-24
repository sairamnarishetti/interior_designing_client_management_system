// src/components/admin/RevenueOverview.jsx
import React from 'react';
import './styles/RevenueOverview.css';

const RevenueOverview = () => {
  return (
    <div className="revenue-overview-card">
      <h3>Revenue Overview</h3>
      <p>Monthly revenue for the past 6 months</p>
      <div className="revenue-chart-wrapper">
        <div className="bar-chart">
          {[4800, 5200, 6100, 5800, 6400, 7200].map((value, index) => (
            <div key={index} className="bar" style={{ height: `${value / 50}px` }}>
              <span className="bar-value">${value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
