// src/components/admin/Tasks.jsx

import React from 'react';
import './styles/Tasks.css';

const Tasks = () => {
  const tasks = [
    "Prepare design proposal for Sarah",
    "Order fabric samples for Wilson project",
    "Call contractor about kitchen remodel",
    "Review 3D renderings"
  ];

  return (
    <div className="tasks-container">
      <h3 className="tasks-title">Tasks</h3>
      <p className="tasks-subtitle">Your pending tasks</p>
      <ul className="tasks-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <input type="checkbox" id={`task-${index}`} className="task-checkbox" />
            <label htmlFor={`task-${index}`} className="task-text">
              {task}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
