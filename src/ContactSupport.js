// import React, { useState, useEffect } from 'react';
// import './ContactSupport.css'; // CSS file for custom styling
// import { useAuth0 } from "@auth0/auth0-react";

// const ContactSupport = ({ onChatClick }) => {
//   const [faqOpen, setFaqOpen] = useState([false, false, false]); // To handle FAQ toggle state
//   const [isSubmitting, setIsSubmitting] = useState(false); // To handle submit spinner
//   const { loginWithRedirect, isAuthenticated, user } = useAuth0();
//   const { logout } = useAuth0();

//   const toggleFaq = (index) => {
//     const newFaqOpen = [...faqOpen];
//     newFaqOpen[index] = !newFaqOpen[index];
//     setFaqOpen(newFaqOpen);
//   };

//   useEffect(() => {
//     const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
//     if (toggleSwitch) {
//       const handleThemeChange = (e) => {
//         document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
//       };
//       toggleSwitch.addEventListener('change', handleThemeChange);

//       // Cleanup the event listener on component unmount
//       return () => toggleSwitch.removeEventListener('change', handleThemeChange);
//     }
//   }, []);

//   // Handle form submission and trigger spinner
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior
//     setIsSubmitting(true); // Show the spinner

//     // Simulate form submission delay (replace this with actual form submission logic)
//     setTimeout(() => {
//       e.target.submit(); // Submit the form after the simulated delay
//     }, 3000);
//   };

//   return (
//     <div className="support-container">
//       {/* Header Section */}
//       <header className="support-header">
//         <h1>Contact Us</h1>
//         <p>We're here to help. Choose a way to get in touch below.</p>
//       </header>

//       {/* Support Sign-In Section */}
//       <section className="signin-section">
//         <h2>Sign In for Personalized Support</h2>

//         {isAuthenticated && <p>Welcome {user.name} !! </p>}
//         {
//           isAuthenticated ? (
//             <li>
//               <button className="signout-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Sign Out</button>
//             </li>
//           ) : (
//             <button onClick={() => loginWithRedirect()} className="signin-button">Sign In</button>
//           )
//         }
//       </section>

//       {/* Product Options Section */}
//       <section className="product-options">
//         <h2>Select a Product</h2>
//         <div className="product-grid">
//           <div className="product-item">
//             <i className="fas fa-check-circle product-icon"></i>
//             Blockchain Verification
//           </div>
//           <div className="product-item">
//             <i className="fas fa-video product-icon"></i>
//             Video Authentication
//           </div>
//           <div className="product-item">
//             <i className="fas fa-code product-icon"></i>
//             Support for Developers
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="faq-section">
//       <h2>Frequently Asked Questions</h2>
      
//       {/* First Question */}
//       <div className={`faq-item ${faqOpen[0] ? 'faq-opened' : ''}`} onClick={() => toggleFaq(0)}>
//         <button className="faq-question">How does blockchain verify videos?</button>
//         <div className="faq-answer">
//           Blockchain verifies videos by creating an immutable record of the video’s metadata and hashing it into a blockchain transaction...
//         </div>
//       </div>

//       {/* Second Question */}
//       <div className={`faq-item ${faqOpen[1] ? 'faq-opened' : ''}`} onClick={() => toggleFaq(1)}>
//         <button className="faq-question">How do I contact support?</button>
//         <div className="faq-answer">
//           You can contact support via email at "fna.ai2024@gmail.com".
//         </div>
//       </div>

//       {/* Third Question */}
//       <div className={`faq-item ${faqOpen[2] ? 'faq-opened' : ''}`} onClick={() => toggleFaq(2)}>
//         <button className="faq-question">What are the supported video formats?</button>
//         <div className="faq-answer">
//           We support MP4, AVI, MOV, and WMV video formats. Make sure your video size does not exceed 2GB for faster processing.
//         </div>
//       </div>
//     </section>

//       {/* Contact Form */}
//       <section className="support-form">
//         <h2>Submit a Support Request</h2>
//         <form onSubmit={handleSubmit} action='https://formspree.io/f/myzgrjgw' method="POST">
//           <input type="text" name="username" placeholder="Your Name" autoComplete="off" required />
//           <input type="email" name="Email" placeholder="Email" autoComplete="off" required />
//           <textarea placeholder="Describe your issue" name="message" required></textarea>
//           <button type="submit" className={`submit-button ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
//             {isSubmitting ? 'Submitting...' : 'Submit'}
//           </button>
//         </form>
//       </section>

//     </div>
//   );
// };

// export default ContactSupport;


import React, { useState } from 'react';
import './ContactSupport.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaVideo, FaCode, FaChevronDown, FaUser, FaEnvelope, FaPen } from 'react-icons/fa';

const ContactSupport = () => {
  const [faqOpen, setFaqOpen] = useState([false, false, false]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen.map((item, i) => i === index ? !item : false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      e.target.submit();
    }, 3000);
  };

  return (
    <div className="support-container">
      <motion.header 
        className="support-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Contact Us</h1>
        <p>We're here to help. Choose a way to get in touch below.</p>
      </motion.header>

      {/* SVG Animation Section */}
      <section className="svg-animation">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00ffcc', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#00cc99', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Background */}
          <rect width="400" height="300" fill="#000000" />
          
          {/* Abstract shapes */}
          <circle cx="200" cy="150" r="100" fill="none" stroke="url(#grad1)" strokeWidth="4">
            <animate attributeName="r" values="100;110;100" dur="4s" repeatCount="indefinite" />
          </circle>
          
          <path d="M200,50 Q230,150 200,250 T200,50" fill="none" stroke="#00ffcc" strokeWidth="3">
            <animate attributeName="d" values="M200,50 Q230,150 200,250 T200,50;M200,50 Q170,150 200,250 T200,50;M200,50 Q230,150 200,250 T200,50" dur="6s" repeatCount="indefinite" />
          </path>
          
          {/* Communication symbols */}
          <g transform="translate(150, 130)">
            <rect x="0" y="0" width="40" height="30" rx="5" fill="#00ffcc">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </rect>
            <polyline points="0,0 20,15 40,0" fill="none" stroke="#050505" strokeWidth="2" />
          </g>
          
          <g transform="translate(210, 140)">
            <circle cx="15" cy="15" r="15" fill="#00cc99">
              <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
            </circle>
            <path d="M15,8 Q8,15 15,22 T15,8" fill="none" stroke="#050505" strokeWidth="2" />
          </g>
          
          {/* Connecting lines */}
          <line x1="100" y1="150" x2="300" y2="150" stroke="#00ffcc" strokeWidth="1" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;100" dur="10s" repeatCount="indefinite" />
          </line>
          
          <line x1="200" y1="50" x2="200" y2="250" stroke="#00cc99" strokeWidth="1" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;100" dur="10s" repeatCount="indefinite" />
          </line>
        </svg>
      </section>

      <section className="product-options">
        <h2>Select a Product</h2>
        <div className="product-grid">
          {[
            { icon: FaCheckCircle, text: "Blockchain Verification", description: "Secure your data with cutting-edge blockchain technology" },
            { icon: FaVideo, text: "Video Authentication", description: "Ensure the authenticity of your video content" },
            { icon: FaCode, text: "Developer Support", description: "Get expert assistance for your development needs" }
          ].map((product, index) => (
            <motion.div 
              key={index}
              className="product-item"
              whileHover={{ scale: 1.05, rotateY: 15, z: 50 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <product.icon className="product-icon" />
              <h3>{product.text}</h3>
              <p>{product.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {[
          { question: "How does blockchain verify videos?", answer: "Our blockchain verification process creates an immutable record of your video's metadata. This data is then hashed and stored on a blockchain, providing a tamper-proof timestamp and ensuring the integrity of your content." },
          { question: "How do I contact support?", answer: "You can reach our dedicated support team via email at 'fna.ai2024@gmail.com'. We're available 24/7 to assist you with any queries or concerns you may have." },
          { question: "What are the supported video formats?", answer: "We support a wide range of video formats to accommodate your needs. This includes MP4, AVI, MOV, and WMV. If you have a specific format not listed here, please contact our support team for assistance." }
        ].map((faq, index) => (
          <motion.div 
            key={index}
            className={`faq-item ${faqOpen[index] ? 'faq-opened' : ''}`}
            onClick={() => toggleFaq(index)}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <button className="faq-question">
              {faq.question}
              <motion.div
                animate={{ rotate: faqOpen[index] ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="faq-icon" />
              </motion.div>
            </button>
            <AnimatePresence>
              {faqOpen[index] && (
                <motion.div 
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>

      <motion.section 
        className="support-form"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2>Submit a Support Request</h2>
        <form onSubmit={handleSubmit} action='https://formspree.io/f/myzgrjgw' method="POST">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input type="text" name="username" placeholder="Your Name" autoComplete="off" required />
          </div>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" name="Email" placeholder="Email" autoComplete="off" required />
          </div>
          <div className="input-group">
            <FaPen className="input-icon textarea-icon" />
            <textarea placeholder="Describe your issue" name="message" required></textarea>
          </div>
          <motion.button 
            type="submit" 
            className="submit-button" 
            disabled={isSubmitting}
            whileHover={{ scale: 1.1 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </motion.button>
        </form>
      </motion.section>
    </div>
  );
};

export default ContactSupport;
