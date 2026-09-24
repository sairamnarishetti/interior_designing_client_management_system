import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'client'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedData = JSON.parse(localStorage.getItem('user'));

    if (
      savedData &&
      formData.email === savedData.email &&
      formData.password === savedData.password &&
      formData.role === savedData.role
    ) {
      const redirectPath =
        savedData.role === 'client'
          ? '/dashboard/client'
          : '/dashboard/admin';
      navigate(redirectPath);
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Enter your credentials to access your account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label">Email</label>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label className="input-label">Password</label>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <label className="input-label">Account Type</label>
          <div className="role-selection-row">
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

          <div className="forgot-password">Forgot Password?</div>
          <button type="submit" className="login-button">Sign In</button>

          <p className="continue-with">OR CONTINUE WITH</p>
          <div className="social-login">
            <button type="button" className="google-button">Google</button>
            <button type="button" className="facebook-button">Facebook</button>
          </div>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
