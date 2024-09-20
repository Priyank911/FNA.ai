import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import App from './App';
import About from './About';
import Extension from './Extension';
import Blockchain from './Blockchain' // Import the Coming Soon component
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/extension" element={<Extension />} />
        <Route path="/blockchain" element={<Blockchain />} /> {/* New route for Coming Soon feature */}
      </Routes>
    </Router>
  </React.StrictMode>
);
