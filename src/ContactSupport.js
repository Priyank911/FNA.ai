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
