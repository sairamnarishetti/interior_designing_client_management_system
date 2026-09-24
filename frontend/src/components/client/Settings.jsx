import React, { useState } from 'react';
import './styles/Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className="tab-card">
            <h2>Profile Information</h2>
            <div className="billing-grid">
              <input type="text" placeholder="Full Name" defaultValue="Harshini" />
              <input type="email" placeholder="Email Address" defaultValue="harshini@example.com" />
              <input type="text" placeholder="Phone Number" />
              <input type="text" placeholder="Username" />
            </div>
            <div className="btn-group">
              <button className="btn outline">Cancel</button>
              <button className="btn primary">Save Changes</button>
            </div>
          </div>
        );

      case 'Security':
        return (
          <div className="tab-card">
            <h2>Security Settings</h2>
            <div className="billing-grid">
              <input type="password" placeholder="Current Password" />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm New Password" />
            </div>
            <div className="btn-group">
              <button className="btn outline">Cancel</button>
              <button className="btn primary">Update Password</button>
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="tab-card">
            <h2>Notification Settings</h2>
            <p className="subtext">Manage how you receive notifications and updates</p>
            <h3>Email Notifications</h3>
            {[ 
              { label: 'Project Updates', desc: 'Receive updates on your project status' },
              { label: 'New Messages', desc: 'Receive emails when someone sends you a message' },
              { label: 'Order Status Changes', desc: 'Receive emails when your order status changes' },
              { label: 'Payment Updates', desc: 'Receive emails about invoices and payments' },
              { label: 'Marketing & Promotions', desc: 'Receive emails about new features and offers' },
            ].map((item, idx) => (
              <div key={idx} className="setting-item">
                <div>
                  <p className="label">{item.label}</p>
                  <p className="desc">{item.desc}</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            ))}

            <h3 style={{ marginTop: '2rem' }}>Push Notifications</h3>
            <div className="setting-item">
              <div>
                <p className="label">Enable Push Notifications</p>
                <p className="desc">Allow us to send you push notifications</p>
              </div>
              <input type="checkbox" />
            </div>

            <div className="btn-group">
              <button className="btn outline">Reset to Default</button>
              <button className="btn primary">Save Changes</button>
            </div>
          </div>
        );

      case 'Billing':
        return (
          <div className="tab-card">
            <h2>Billing Information</h2>
            <div className="payment-method">
              <div>
                <p className="label">Visa ending in 4242</p>
                <p className="desc">Expires 12/2025</p>
              </div>
              <div className="billing-actions">
                <button className="btn outline small">Edit</button>
                <button className="btn danger small">Remove</button>
              </div>
            </div>

            <button className="btn outline full">+ Add Payment Method</button>

            <h3>Billing Address</h3>
            <div className="billing-grid">
              <input type="text" placeholder="Full Name" defaultValue="Harshini" />
              <input type="text" placeholder="Company Name" />
              <input type="text" placeholder="Address Line 1" />
              <input type="text" placeholder="Address Line 2" />
              <input type="text" placeholder="City" />
              <input type="text" placeholder="State/Province" />
              <input type="text" placeholder="Postal Code" />
              <select>
                <option>United States</option>
                <option>India</option>
              </select>
            </div>

            <div className="btn-group">
              <button className="btn outline">Cancel</button>
              <button className="btn primary">Save Changes</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      {/* ✅ Header Section */}
      <div className="settings-header">
        <h1 className="settings-title">Account Settings</h1>
        <p className="settings-subtitle">Manage your account settings and preferences</p>
      </div>

      {/* ✅ Tab Navigation */}
      <div className="tab-bar">
        {['Profile', 'Security', 'Notifications', 'Billing'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ✅ Active Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Settings;
