import React from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <span className="nav">
        <span className="nav-link home">Home</span>
        <span className="nav-separator gt"> &gt; </span>
        <span className="nav-link header-dashboard">Dashboard</span>
        <span className="search-container">
          <input 
            type="text" 
            placeholder="search anything..." 
            className="search-input" 
            onChange={handleInputChange}
          />
        </span>
      </span>
    </header>
  );
};

export default Header;
