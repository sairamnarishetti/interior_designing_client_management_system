// src/components/client/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="logo">Client Panel</h2>
            <nav>
                <ul>
                    <li><NavLink to="/dashboard/client">Dashboard</NavLink></li>
                    <li><NavLink to="/my-projects">My Projects</NavLink></li>
                    <li><NavLink to="/consultation">Book Consultation</NavLink></li>
                    <li><NavLink to="/billing">Billing & Payments</NavLink></li>
                    <li><NavLink to="/messages">Messages</NavLink></li>
                    <li><NavLink to="/feedback">Feedback</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><NavLink to="/settings">Settings</NavLink></li>
                    <li><NavLink to="/login">Logout</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
