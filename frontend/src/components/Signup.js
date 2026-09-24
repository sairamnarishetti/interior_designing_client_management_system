// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { fullName, phone, email, password, role } = formData;
    const userData = { fullName, phone, email, password, role };
    localStorage.setItem('user', JSON.stringify(userData));

    alert('Account created successfully!');
    navigate(role === 'client' ? '/dashboard/client' : '/dashboard/admin');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create an Account</h2>
        <p className="subtitle">Fill in the information to create your account</p>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="account-type">
            <label>
              <input
                type="radio"
                name="role"
                value="client"
                checked={formData.role === 'client'}
                onChange={handleChange}
              />
              Client
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="designer"
                checked={formData.role === 'designer'}
                onChange={handleChange}
              />
              Designer
            </label>
          </div>
          <button type="submit">Create Account</button>
        </form>
        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: '#007bff' }}>Log in</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
