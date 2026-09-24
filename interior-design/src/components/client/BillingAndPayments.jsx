import React, { useState } from 'react';
import Invoices from './Invoices.tsx';
import PaymentMethods from './PaymentMethods.tsx';
import BillingHistory from './BillingHistory';
import Sidebar from './Sidebar.jsx'; // ✅ Import Sidebar
import './styles/BillingAndPayments.css';
import './styles/Sidebar.css'; // ✅ Make sure sidebar styles apply

const BillingAndPayments = () => {
  const [activeTab, setActiveTab] = useState('invoices');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'invoices':
        return <Invoices />;
      case 'paymentMethods':
        return <PaymentMethods />;
      case 'billingHistory':
        return <BillingHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="billing-layout"> {/* 🔄 New wrapper to align sidebar + content */}
      <Sidebar /> {/* ✅ Sidebar on the left */}
      
      <div className="billing-container">
        <h2 className="billing-title">Billing & Payments</h2>

        <div className="billing-tabs">
          <button
            className={`tab-button ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            Invoices
          </button>
          <button
            className={`tab-button ${activeTab === 'paymentMethods' ? 'active' : ''}`}
            onClick={() => setActiveTab('paymentMethods')}
          >
            Payment Methods
          </button>
          <button
            className={`tab-button ${activeTab === 'billingHistory' ? 'active' : ''}`}
            onClick={() => setActiveTab('billingHistory')}
          >
            Billing History
          </button>
        </div>

        <div className="billing-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default BillingAndPayments;
