import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-box">
                <div className="footer-column">
                    <h4>Quick Links</h4>
                    <a href="#">Home</a>
                    <a href="#">Services</a>
                    <a href="#">Payments</a>
                    <a href="#">Login</a>
                    <a href="#">Sign Up</a>
                </div>

                <div className="footer-column">
                    <h4>Services</h4>
                    <a href="#">Interior Design</a>
                    <a href="#">Space Planning</a>
                    <a href="#">3D Visualization</a>
                    <a href="#">Consultation</a>
                    <a href="#">Project Management</a>
                </div>

                <div className="footer-column">
                    <h4>Contact</h4>
                    <p>123 Design Street, Creative City, 94103</p>
                    <p>+1 (123) 456-7890</p>
                    <p>info@interiorstudio.com</p>
                </div>
            </div>

            <div className="footer-social-icons">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 InteriorStudio. All rights reserved.</p>
                <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Cookie Policy</a>
            </div>
        </div>
    );
};

export default Footer;
