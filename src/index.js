// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Navbar'; 
// import Footer from './Footer'; // Import Footer component
// import App from './App';
// import About from './About';
// import Extension from './Extension'; 
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/extension" element={<Extension />} />
//       </Routes>
//       <Footer /> {/* Render the Footer component below the Routes */}
//     </Router>
//   </React.StrictMode>
// );
// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Navbar'; 
// import Footer from './Footer';
// import App from './App';
// import About from './About';
// import Extension from './Extension';
// import './index.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

// const MobilePopup = () => {
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 768) {
//         setShowPopup(true);
//       } else {
//         setShowPopup(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     showPopup && (
//       <div className="popup">
//   <div className="popup-content">
//     <span className="close-popup" onClick={() => setShowPopup(false)}>✖</span>
    
//     <div className="icon-box">
//     <FontAwesomeIcon icon={faMobileAlt} className="call-icon" />
// </div>
    
//     <p className="name">FNA.ai</p>  {/* Name moved below the icon box */}
    
//     <p className="message">Innovative AI Solutions. For the best experience, use a desktop.</p>
    
//     <button className="button-robotic"><span>Contact Us</span></button> {/* Robotic-themed Contact Us button */}
//   </div>
// </div>

//     )
//   );
// };

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       <Navbar />
//       <MobilePopup />
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/extension" element={<Extension />} />
//       </Routes>
//       <Footer />
//     </Router>
//   </React.StrictMode>
// );


//------------Seesion code-------------

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; 
import Footer from './Footer';
import App from './App';
import About from './About';
import Extension from './Extension';
import './index.css';
import HistoryPage from './HistoryPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const MobilePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if popup was already closed in this session
      const isPopupClosed = sessionStorage.getItem('popupClosed');
      if (!isPopupClosed && window.innerWidth <= 768) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it immediately in case user is already on mobile

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('popupClosed', 'true'); // Mark popup as closed for the session
  };

  return (
    showPopup && (
      <div className="popup">
        <div className="popup-content">
          <span className="close-popup" onClick={closePopup}>✖</span>
          
          <div className="icon-box">
            <FontAwesomeIcon icon={faMobileAlt} className="call-icon" />
          </div>
          
          <p className="name">FNA.ai</p>  {/* Name moved below the icon box */}
          
          <p className="message">Innovative AI Solutions. For the best experience, use a desktop.</p>
          
          <button className="button-robotic"><span>Contact Us</span></button> {/* Robotic-themed Contact Us button */}
        </div>
      </div>
    )
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <MobilePopup />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/extension" element={<Extension />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);
