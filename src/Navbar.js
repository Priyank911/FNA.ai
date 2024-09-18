import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="fna">FNA</span>
        <span className="ai">.AI</span>
      </div>
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/extension">Extension</Link></li>
        <li><Link to="/blockchain">Blockchain</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
