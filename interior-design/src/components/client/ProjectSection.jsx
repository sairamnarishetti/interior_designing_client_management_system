import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import '../client/styles/ProjectSection.css';

const ProjectSection = () => {
  return (
    <div className="project-section">
      <div className="projects-list">

        <Link to="/my-projects/livingroom" style={{ textDecoration: 'none' }}>
          <ProjectCard
            title="Living Room Redesign"
            designer="Sarah Williams"
            startDate="Oct 10, 2023"
            endDate="Dec 15, 2023"
            progress={65}
            status="In Progress"
          />
        </Link>

        <Link to="/my-projects/kitchen" style={{ textDecoration: 'none' }}>
          <ProjectCard
            title="Kitchen Renovation"
            designer="Michael Chen"
            startDate="Nov 20, 2023"
            endDate="Feb 28, 2024"
            progress={15}
            status="Planning"
          />
        </Link>

      </div>
    </div>
  );
};

export default ProjectSection;
