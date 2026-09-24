import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ProjectCard.css';

const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const ProjectCard = ({ title, designer, startDate, endDate, progress, status, image }) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    const slug = slugify(title);
    navigate(`/my-projects/${slug}`);
  };

  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-info">
        <h3>{title}</h3>
        <span className={`badge ${status.toLowerCase().replace(/\s/g, '-')}`}>{status}</span>
        <p><strong>Designer:</strong> {designer}</p>
        <p><strong>Start Date:</strong> {startDate}</p>
        <p><strong>Completion:</strong> {endDate}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p>{progress}%</p>
        <div className="project-actions">
          <button onClick={handleDetails}>Details</button>
          <button className="outline">Message</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
