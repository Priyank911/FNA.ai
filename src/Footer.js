// // src/Footer.js
// import React from 'react';
// import './Footer.css'; 
// import Logo from './logo.svg'; 
// import '@fortawesome/fontawesome-free/css/all.min.css'; 

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-content">
//         {/* Logo Section */}
//         <div className="footer-logo-section">
//           <img src={Logo} alt="Logo" className="footer-logo-img" />
//           <p className="footer-description">
//             Redefining the AI experience with innovative technology and cutting-edge solutions.
//           </p>
//         </div>
        
//         {/* Social Media Links */}
//         <div className="footer-social-section">
//           <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
//           <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
//           <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
//         </div>
        
//         {/* Copyright Section */}
//         <div className="footer-bottom">
//           <p>&copy; 2024 FNA.ai. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import './Footer.css'; 
import Logo from './logo.svg'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Left Side: Logo Section */}
        <div className="footer-left">
          <img src={Logo} alt="Logo" className="footer-logo-img" />
          <p className="footer-description-desktop">Redefining the AI experience with innovative technology and cutting-edge solutions.</p>

        </div>

        {/* Divider: White Line */}
        <div className="footer-divider"></div>

        {/* Right Side: About, Contact & Social Media */}
        <div className="footer-right">
          <div className="footer-info-section">
            <div className="footer-about">
              <h4>About Us</h4>
              <p className="footer-description-desktop">We are a forward-thinking tech company building intelligent solutions for the future.</p>
              <a href="/about" className="footer-link">Learn More</a>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p className="footer-description-desktop">Have questions or feedback? We'd love to hear from you.</p>
              <a href="/contact" className="footer-link">Get in Touch</a>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="footer-social-section">
            <a href="#" aria-label="Facebook" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn" className="social-icon linkedin"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="Instagram" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 FNA.ai. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

