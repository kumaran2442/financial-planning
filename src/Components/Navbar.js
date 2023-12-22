// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/Calculation" className="nav-link">Calculation</Link>
        </li>
        <li className="nav-item">
          <Link to="/InvestmentCalculator" className="nav-link">InvestmentCalculator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
