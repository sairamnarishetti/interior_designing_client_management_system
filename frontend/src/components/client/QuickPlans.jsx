import React from 'react';
import './styles/QuickPlans.css';

const QuickPlans = () => {
  const plans = [
    { label: 'Browse Services', icon: '📦' },
    { label: 'Schedule Appointment', icon: '📅' },
    { label: 'Make a Payment', icon: '💳' },
    { label: 'Contact Designer', icon: '📞' },
  ];

  return (
    <div className="quick-plans">
      <h2>Quick Plans</h2>
      {plans.map((plan, index) => (
        <div className="plan-item" key={index}>
          <span className="plan-icon">{plan.icon}</span>
          <span>{plan.label}</span>
        </div>
      ))}
    </div>
  );
};

export default QuickPlans;
