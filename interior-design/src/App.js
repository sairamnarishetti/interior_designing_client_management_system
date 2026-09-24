// App.js
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import RequestQuote from './components/RequestQuote';
import Login from './components/Login';
import Signup from './components/Signup';

import ClientDashboard from './components/client/ClientDashboard';
import MyProjects from './components/client/MyProjects';
import ProjectDetails from './components/client/ProjectDetails';
import ProjectTimeline from './components/client/ProjectTimeline';
import Appointments from './components/client/Appointments';
import Consultation from './components/client/Consultation';
import BillingAndPayments from './components/client/BillingAndPayments';
import Messages from './components/client/Messages';
import Feedback from './components/client/feedback';
import Profile from './components/client/Profile';
import Settings from './components/client/Settings';

import AdminDashboard from './components/admin/AdminDashboard';
import ClientManagement from './components/admin/ClientManagement';
import ProjectManagement from './components/admin/ProjectManagement';
import FinancialReports from './components/admin/FinancialReports';
import Messaging from './components/admin/Messaging';
import TeamManagement from './components/admin/TeamManagement';
import VendorManagement from './components/admin/VendorManagement';
import Billing from './components/admin/Billing';
import AdminProfile from './components/admin/Profile';
import AdminSettings from './components/admin/Settings';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public layout
const MainLayout = ({ children }) => (
  <>
    <Header />
    <div className="content">{children}</div>
    <Footer />
  </>
);

// Dashboard layout without sidebar
const DashboardLayout = ({ children }) => (
  <div className="min-h-screen p-4">{children}</div>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Routes>
          {/* 🔐 Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Admin Dashboard Route */}
          <Route path="/dashboard/admin" element={
            <DashboardLayout><AdminDashboard /></DashboardLayout>
          } />
          <Route path="/dashboard/admin/client" element={
  <DashboardLayout><ClientManagement /></DashboardLayout>
} />
<Route path="/dashboard/admin/project" element={
  <DashboardLayout><ProjectManagement /></DashboardLayout>
} />
 <Route path="/dashboard/admin/payment" element={
  <DashboardLayout><FinancialReports /></DashboardLayout>
} />
<Route path="/dashboard/admin/messages" element={
  <DashboardLayout><Messaging /></DashboardLayout>
} />
<Route path="/dashboard/admin/team" element={
  <DashboardLayout><TeamManagement /></DashboardLayout>
} />
<Route path="/dashboard/admin/vendor" element={
  <DashboardLayout><VendorManagement /></DashboardLayout>
} />
<Route path="/dashboard/admin/billing" element={
  <DashboardLayout><Billing /></DashboardLayout>
} />
<Route path="/admin/profile" element={
  <DashboardLayout><Profile /></DashboardLayout>
} />
<Route path="/admin/Settings" element={
  <DashboardLayout><Settings /></DashboardLayout>
} />
          {/* 🧑‍💼 Client Dashboard Routes */}
          <Route path="/dashboard/client" element={
            <DashboardLayout><ClientDashboard /></DashboardLayout>
          } />
          <Route path="/profile" element={
            <DashboardLayout><Profile /></DashboardLayout>
          } />
          <Route path="/settings" element={
            <DashboardLayout><Settings /></DashboardLayout>
          } />
          <Route path="/my-projects" element={
            <DashboardLayout><MyProjects /></DashboardLayout>
          } />
          <Route path="/my-projects/:slug" element={
            <DashboardLayout><ProjectDetails /></DashboardLayout>
          } />
          <Route path="/my-projects/:title/timeline" element={
            <DashboardLayout><ProjectTimeline /></DashboardLayout>
          } />
          <Route path="/appointments" element={
            <DashboardLayout><Appointments /></DashboardLayout>
          } />
          <Route path="/consultation" element={
            <DashboardLayout><Consultation /></DashboardLayout>
          } />
          <Route path="/billing" element={
            <DashboardLayout><BillingAndPayments /></DashboardLayout>
          } />
          <Route path="/messages" element={
            <DashboardLayout><Messages /></DashboardLayout>
          } />
          <Route path="/feedback" element={
            <DashboardLayout><Feedback /></DashboardLayout>
          } />

          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
          <Route path="/quote" element={<MainLayout><RequestQuote /></MainLayout>} />

          {/* 🚫 Fallback */}
          <Route path="*" element={<MainLayout><h2>404 - Page Not Found</h2></MainLayout>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
