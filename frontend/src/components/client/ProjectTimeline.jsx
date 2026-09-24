// components/client/ProjectTimeline.js
import React from 'react';
import './styles//ProjectTimeline.css'; // Optional for styling

const timelineData = [
    { title: 'Initial measurements and planning', due: 'Oct 15, 2023', status: 'Completed' },
    { title: 'Materials selection and ordering', due: 'Oct 25, 2023', status: 'Completed' },
    { title: 'Demolition and prep work', due: 'Nov 10, 2023', status: 'In Progress' },
    { title: 'Furniture installation', due: 'Nov 30, 2023', status: 'To Do' },
    { title: 'Final styling and accessories', due: 'Dec 10, 2023', status: 'To Do' },
];

const ProjectTimeline = () => {
    return (
        <div className="timeline-container">
            <h2>Project Timeline</h2>
            <p>Track the progress of your project tasks and milestones</p>

            <ul className="timeline-list">
                {timelineData.map((task, idx) => (
                    <li key={idx} className={`task ${task.status.toLowerCase().replace(' ', '-')}`}>
                        <div className="task-title">{task.title}</div>
                        <div className="task-due">Due: {task.due}</div>
                        <div className="task-status">{task.status}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectTimeline;
