import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import './styles/MyProjects.css'; // Optional, for styling

// Slugify utility to create URL-friendly slugs
const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const projectData = [
  {
    title: 'Living Room Redesign',
    designer: 'Sarah Williams',
    startDate: 'Oct 10, 2023',
    endDate: 'Dec 15, 2023',
    progress: 65,
    status: 'In Progress',
    image: '/images/livingroom.jpg',
  },
  {
    title: 'Kitchen Renovation',
    designer: 'Michael Chen',
    startDate: 'Nov 20, 2023',
    endDate: 'Feb 28, 2024',
    progress: 15,
    status: 'Planning',
    image: '/images/kitchen.jpg',
  },
  {
    title: 'Bedroom Makeover',
    designer: 'Emma Thompson',
    startDate: 'Aug 15, 2023',
    endDate: 'Sep 30, 2023',
    progress: 100,
    status: 'Completed',
    image: '/images/bedroom.jpg',
  },
];

const MyProjects = () => {
  return (
    <div className="my-projects-page">
      <h2>My Projects</h2>
      <p>Track and manage your interior design projects</p>

      <div className="project-grid">
        {projectData.map((project, i) => {
          const slug = slugify(project.title);
          return (
            <Link to={`/my-projects/${slug}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ProjectCard {...project} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MyProjects;
