import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="navbar">
                <Link to="/" className="header-logo">InteriorStudio</Link>
                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/faq">FAQ</Link>
                </nav>
                <div className="nav-buttons">
                    <Link to="/quote" className="nav-button">Request Quote</Link>
                    <Link to="/login" className="nav-button">Log In</Link>
                    <Link to="/signup" className="nav-button">Sign Up</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
