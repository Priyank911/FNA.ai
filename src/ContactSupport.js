import React, { useState } from 'react';
import './ContactSupport.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaChevronDown, FaTwitter, FaLinkedin, FaArrowRight, FaCheck, FaInstagram, FaTimes } from 'react-icons/fa';

const ContactSupport = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    id: '',
    issue: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openTicketModal = () => {
    setShowTicketModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeTicketModal = () => {
    setShowTicketModal(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
    // Reset form state if modal is closed
    if (!submitSuccess) {
      setTicketForm({
        name: '',
        id: '',
        issue: ''
      });
      setFormErrors({});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketForm({
      ...ticketForm,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!ticketForm.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!ticketForm.id.trim()) {
      errors.id = 'Mail ID is required';
    }
    if (!ticketForm.issue.trim()) {
      errors.issue = 'Please describe your issue';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/myzgrjgw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: ticketForm.name,
          email: ticketForm.id,
          issue: ticketForm.issue,
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setTicketForm({
          name: '',
          id: '',
          issue: ''
        });
        setSubmitSuccess(false);
        closeTicketModal();
      }, 5000);
    } catch (error) {
      console.error('Error submitting ticket:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <div className="support-container">
      <div className="grid-background"></div>
      <div className="light-effect light-effect-1"></div>
      <div className="light-effect light-effect-2"></div>
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className="hero-eyebrow">Support Center</span>
            <h1>How can we help you today?</h1>
            <p className="hero-subtitle">
              Our dedicated team is ready to assist you with any questions or concerns you may have about our products and services.
            </p>
            <div className="hero-cta">
              <a href="#contact-options" className="hero-button">
                Get Support <FaArrowRight className="hero-button-icon" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="shape-container">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              
              {/* Small decorative bubbles */}
              <div className="shape-small shape-small-1"></div>
              <div className="shape-small shape-small-2"></div>
              <div className="shape-small shape-small-3"></div>
              <div className="shape-small shape-small-4"></div>
              
              {/* Decorative elements */}
              <div className="shape-decoration shape-dot-1"></div>
              <div className="shape-decoration shape-dot-2"></div>
              <div className="shape-decoration shape-dot-3"></div>
              <div className="shape-decoration shape-line"></div>
            </div>
          </motion.div>
        </section>

        {/* Contact Options */}
        <motion.section 
          id="contact-options"
          className="contact-options-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="decoration-element decoration-dots"></div>
          <div className="decoration-element decoration-circle"></div>
          
          <div className="section-heading">
            <span className="section-tag">Contact Options</span>
            <h2>Reach out to us</h2>
            <div className="heading-line"></div>
          </div>

          <motion.div 
            className="contact-cards"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="contact-card featured-card" variants={fadeIn}>
              <span className="featured-label">Recommended</span>
              <div className="card-icon-wrapper">
                <div className="icon-glow"></div>
                <FaEnvelope className="card-icon" />
              </div>
              <h3>Email Support</h3>
              <p>Get in touch with our support team via email for detailed assistance with your account or service issues.</p>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=fna.ai2024@gmail.com" target="_blank" rel="noopener noreferrer" className="card-link">
                Send an email <FaArrowRight className="link-icon" />
              </a>
            </motion.div>

            <motion.div className="contact-card" variants={fadeIn}>
              <div className="card-icon-wrapper">
                <div className="icon-glow"></div>
                <FaPhone className="card-icon" />
              </div>
              <h3>Phone Support</h3>
              <p>Speak directly with our support agents for immediate assistance with urgent matters during business hours.</p>
              <a href="tel:+1234567890" className="card-link">
                Call us now <FaArrowRight className="link-icon" />
              </a>
            </motion.div>

            <motion.div className="contact-card" variants={fadeIn}>
              <div className="card-icon-wrapper">
                <div className="icon-glow"></div>
                <FaCheck className="card-icon" />
              </div>
              <h3>Self-Service</h3>
              <p>Browse our comprehensive knowledge base to find quick answers to common questions and troubleshooting guides.</p>
              <a href="#faq" className="card-link">
                View resources <FaArrowRight className="link-icon" />
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          id="faq"
          className="faq-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-heading">
            <span className="section-tag">FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <div className="heading-line"></div>
          </div>
          
          <motion.div 
            className="faq-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                question: "How do I reset my password?",
                answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for business accounts. Cryptocurrency payments are also available for select plans."
              },
              {
                question: "Can I upgrade or downgrade my plan anytime?",
                answer: "Yes, you can change your subscription plan at any time from your account dashboard. When upgrading, you'll only be charged the prorated difference. Downgrading will apply at the end of your current billing cycle."
              },
              {
                question: "How do I cancel my subscription?",
                answer: "You can cancel your subscription from your account settings page. Navigate to 'Subscription' and click on 'Cancel Subscription'. Your access will remain active until the end of your current billing period."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes, we offer a 14-day free trial on all our premium plans with full access to all features. No credit card is required to start your trial."
              }
            ].map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <motion.span 
                    className="faq-icon"
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                </button>
                <motion.div 
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openFaq === index ? 'auto' : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="cta-pattern"></div>
          <div className="cta-glow cta-glow-1"></div>
          <div className="cta-glow cta-glow-2"></div>
          
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2>Still need help?</h2>
            <p>
              Our team of experts is ready to provide personalized assistance for any complex issues you might encounter.
            </p>
            <button onClick={openTicketModal} className="cta-button">Contact Our Team</button>
          </motion.div>
        </motion.section>
      </main>

      {/* Ticket Modal */}
      <AnimatePresence>
        {showTicketModal && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-container"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="modal-header">
                <h3>Submit a Support Ticket</h3>
                <button className="close-modal" onClick={closeTicketModal}>
                  <FaTimes />
                </button>
              </div>
              
              {submitSuccess ? (
                <div className="success-message">
                  <div className="success-icon">
                    <FaCheck />
                  </div>
                  <h4>Ticket Submitted Successfully!</h4>
                  <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="ticket-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={ticketForm.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? 'error' : ''}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="id">Mail ID *</label>
                    <input
                      type="email"
                      id="id"
                      name="id"
                      value={ticketForm.id}
                      onChange={handleInputChange}
                      className={formErrors.id ? 'error' : ''}
                      placeholder="Enter your email address"
                    />
                    {formErrors.id && <span className="error-message">{formErrors.id}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="issue">Describe Your Issue *</label>
                    <textarea
                      id="issue"
                      name="issue"
                      value={ticketForm.issue}
                      onChange={handleInputChange}
                      className={formErrors.issue ? 'error' : ''}
                      placeholder="Please provide details about your issue"
                      rows="5"
                    ></textarea>
                    {formErrors.issue && <span className="error-message">{formErrors.issue}</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactSupport;