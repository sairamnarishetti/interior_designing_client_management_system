// src/components/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import Sidebar from './AdminSidebar';
import OverviewCards from './OverviewCards';
import Tabs from './Tabs';
import RevenueOverview from './RevenueOverview';
import UpcomingAppointments from './UpcomingAppointments';
import RecentClients from './RecentClients';
import Tasks from './Tasks';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('revenue'); // Default tab

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <div className="admin-dashboard">
        <div className="dashboard-content">
          <div className="welcome-message">
            <h1>Welcome back, <span>designer
              </span></h1>
            <p>Here's an overview of your design projects and client activities.</p>
          </div>

          <OverviewCards />
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Conditional content based on activeTab */}
          <div className="dashboard-row">
            {activeTab === 'revenue' && (
              <div className="dashboard-column">
                <RevenueOverview />
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="dashboard-column">
                <UpcomingAppointments />
              </div>
            )}

            {activeTab === 'clients' && (
              <div className="dashboard-column">
                <RecentClients />
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="dashboard-column">
                <Tasks />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
