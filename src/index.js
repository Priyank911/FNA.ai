import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; 
import Footer from './Footer'; // Import Footer component
import App from './App';
import About from './About';
import Extension from './Extension'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/extension" element={<Extension />} />
      </Routes>
      <Footer /> {/* Render the Footer component below the Routes */}
    </Router>
  </React.StrictMode>
);
