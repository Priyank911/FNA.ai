// src/Footer.js
import React from 'react';
import './Footer.css'; 
import Logo from './logo.svg'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo-section">
          <img src={Logo} alt="Logo" className="footer-logo-img" />
          <p className="footer-description">
            Redefining the AI experience with innovative technology and cutting-edge solutions.
          </p>
        </div>
        
        {/* Social Media Links */}
        <div className="footer-social-section">
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
        </div>
        
        {/* Copyright Section */}
        <div className="footer-bottom">
          <p>&copy; 2024 FNA.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
