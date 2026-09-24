import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ClientManagement from './components/admin/ClientManagement';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/clients"
            element={
              <AdminRoute>
                <ClientManagement />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 