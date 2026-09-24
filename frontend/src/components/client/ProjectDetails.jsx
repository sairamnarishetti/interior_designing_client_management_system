import React from 'react';
import { useParams } from 'react-router-dom';
import './styles/ProjectDetails.css';

// Slug utility
const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const projects = [
  {
    slug: 'livingroom',
    title: 'Living Room Redesign',
    address: '123 Main St, Anytown, USA',
    startDate: 'Oct 10, 2023',
    completionDate: 'Dec 15, 2023',
    progress: 65,
    budget: '$15,000',
    description:
      'A complete redesign of the living room with new furniture, paint, and decor to create a modern and comfortable space.',
    materials: [
      'Hardwood flooring',
      'Benjamin Moore Paint',
      'Velvet upholstery',
      'Marble coffee table'
    ],
    team: [
      'Sarah Williams - Lead Designer',
      'John Smith - Project Manager',
      'Lisa Johnson - Furniture Specialist'
    ],
    steps: [
      'Demolition and prep work - Due: Nov 10, 2023',
      'Furniture installation - Due: Nov 30, 2023',
      'Final styling and accessories - Due: Dec 10, 2023'
    ]
  },
  {
    slug: 'kitchen',
    title: 'Kitchen Renovation',
    address: '456 Elm St, Anytown, USA',
    startDate: 'Nov 5, 2023',
    completionDate: 'Feb 15, 2024',
    progress: 45,
    budget: '$25,000',
    description:
      'Modern kitchen upgrade with granite countertops, custom cabinetry, and energy-efficient appliances.',
    materials: [
      'Granite countertops',
      'Custom cabinets',
      'Stainless steel appliances',
      'Ceramic tile flooring'
    ],
    team: [
      'Michael Chen – Lead Designer',
      'Emily Davis – Project Manager',
      'Robert Wilson – Kitchen Specialist',
      'Amanda Lee – Interior Designer'
    ],
    steps: [
      'Design concepts approval – Due: Dec 10, 2023',
      'Materials selection – Due: Dec 20, 2023',
      'Demolition – Due: Jan 10, 2024'
    ]
  }
];

const ProjectDetails = () => {
  const { slug } = useParams();

  // Normalize the slug to prevent mismatches
  const normalizedSlug = slugify(slug);
  const project = projects.find((p) => p.slug === normalizedSlug);

  if (!project) {
    return (
      <div className="project-details-container">
        <h2>Project Not Found</h2>
        <p>We couldn’t find details for the project: <strong>{slug}</strong></p>
      </div>
    );
  }

  return (
    <div className="project-details-container">
      <h2 className="project-title">{project.title}</h2>
      <p className="project-address">
        📍 {project.address} | 🗓️ Started: {project.startDate}
      </p>

      <div className="progress-budget">
        <div className="progress">
          <p>Progress</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
          </div>
          <span>{project.progress}%</span>
        </div>
        <div className="budget">
          <p>Budget</p>
          <h3>{project.budget}</h3>
        </div>
        <div className="completion-date">
          <p>Completion Date</p>
          <h3>{project.completionDate}</h3>
        </div>
      </div>

      <div className="project-description">
        <h3>Project Description</h3>
        <p>{project.description}</p>

        <h4>Materials</h4>
        <div className="materials-tags">
          {project.materials.map((mat, i) => (
            <span key={i}>{mat}</span>
          ))}
        </div>
      </div>

      <div className="project-team">
        <h3>Project Team</h3>
        <ul>
          {project.team.map((member, i) => (
            <li key={i}><strong>{member}</strong></li>
          ))}
        </ul>
      </div>

      <div className="next-steps">
        <h3>Next Steps</h3>
        <ul>
          {project.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetails;
