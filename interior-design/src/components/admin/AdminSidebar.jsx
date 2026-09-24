// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>
      <nav>
        <ul>
          <li><NavLink to="/dashboard/admin">Dashboard</NavLink></li>
          <li><NavLink to="/dashboard/admin/client">Client Management</NavLink></li>
          <li><NavLink to="/dashboard/admin/project">Project Management</NavLink></li>
          <li><NavLink to="/dashboard/admin/vendor">Vendor Management</NavLink></li>
          <li><NavLink to="/dashboard/admin/team">Team Management</NavLink></li>
          <li><NavLink to="/dashboard/admin/messages">Messaging</NavLink></li>
          <li><NavLink to="/dashboard/admin/billing">Billing & Payments</NavLink></li>
          <li><NavLink to="/dashboard/admin/payment">Financial Reports</NavLink></li>
          <li><NavLink to="/admin/profile">Profile</NavLink></li>
          <li><NavLink to="/admin/settings">Settings</NavLink></li>
          <li><NavLink to="/login">Logout</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
