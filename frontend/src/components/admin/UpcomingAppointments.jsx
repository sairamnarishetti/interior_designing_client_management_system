import React from 'react';
import './styles/TeamManagement.css';

const teamMembers = [
  {
    name: 'Michael Chen',
    role: 'Senior Interior Designer',
    email: 'michael@example.com',
    phone: '(555) 123-4567',
    projects: 4,
    availability: 'Busy'
  },
  {
    name: 'Emma Thompson',
    role: 'Interior Designer',
    email: 'emma@example.com',
    phone: '(555) 987-6543',
    projects: 2,
    availability: 'Available'
  },
  {
    name: 'Jennifer Lee',
    role: 'Senior Interior Designer',
    email: 'jennifer@example.com',
    phone: '(555) 234-5678',
    projects: 3,
    availability: 'Busy'
  },
  {
    name: 'David Wilson',
    role: 'Junior Designer',
    email: 'david@example.com',
    phone: '(555) 876-5432',
    projects: 1,
    availability: 'Available'
  }
];

const TeamManagement = () => {
  return (
    <div className="team-management-container">
      <div className="header">
        <h2>Team Management</h2>
        <p>Organize your design team and manage project assignments</p>
        <div className="team-actions">
          <input type="text" placeholder="Search team members..." />
          <button>Filter by Role</button>
          <button className="add-btn">+ Add Team Member</button>
        </div>
      </div>

      <div className="filters">
        <button>All Members</button>
        <button>Available</button>
        <button>Busy</button>
      </div>

      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Projects</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, i) => (
            <tr key={i}>
              <td>👨‍🎨 {member.name}</td>
              <td>{member.role}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.projects}</td>
              <td>
                <span className={`badge ${member.availability.toLowerCase()}`}>
                  {member.availability}
                </span>
              </td>
              <td>
                <span className="action-icons">📧 📞 📅 ⋯</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bottom-widgets">
        <div className="widget">
          <h4>📁 Project Assignments</h4>
          <p>Modern Living Room Redesign</p>
          <div className="tags">Emma Thompson • Michael Chen</div>
          <p>Kitchen Renovation</p>
          <div className="tags">Jennifer Lee</div>
        </div>
        <div className="widget">
          <h4>🧑‍💼 Team Breakdown</h4>
          <p>Senior Designers — 2</p>
          <div className="bar senior"></div>
          <p>Interior Designers — 1</p>
          <div className="bar interior"></div>
          <p>Junior Designers — 1</p>
          <div className="bar junior"></div>
        </div>
        <div className="widget">
          <h4>📊 Workload Report</h4>
          {teamMembers.map((member, i) => (
            <div key={i}>
              <p>{member.name} — {member.projects} projects</p>
              <div className={`bar workload ${member.availability.toLowerCase()}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
