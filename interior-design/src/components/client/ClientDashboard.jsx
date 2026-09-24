import React, { useState } from 'react';
import './styles/ClientDashboard.css';
import Sidebar from './Sidebar';
import OverviewCard from './OverviewCard';
import ProjectSection from './ProjectSection';
import QuickPlans from './QuickPlans';
import Timeline from './Timeline';
import Appointments from './Appointments';
import Payments from './Payments'; // New Import

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="client-dashboard">
      <Sidebar />
      <div className="main-content-layout">
        <div className="main-content-left">
          <div className="overview-section">
            <OverviewCard />
          </div>

          <div className="tab-buttons">
            <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => handleTabChange('projects')}>
               Projects
            </button>
            <button className={activeTab === 'appointments' ? 'active' : ''} onClick={() => handleTabChange('appointments')}>
              Appointments
            </button>
            <button className={activeTab === 'payments' ? 'active' : ''} onClick={() => handleTabChange('payments')}>
              Payment History
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'projects' && <ProjectSection />}
            {activeTab === 'appointments' && <Appointments />}
            {activeTab === 'payments' && <Payments />}
          </div>
        </div>

        <div className="main-content-right">
          <QuickPlans />
          <Timeline />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
