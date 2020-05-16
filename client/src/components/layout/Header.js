import React from 'react';
import Logo from './Logo';

const Header = () => {
  return (
    <div className='header-container'>
      <div style={logoContainerStyle}>
        <Logo />
        <span style={titleStyle}>Expense Tracker</span>
      </div>
      <a href='mailto:m.a.faried@gmail.com'>
        Contact Developer: m.a.faried@gmail.com
      </a>
    </div>
  );
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  padding: '5px',
};

const logoContainerStyle = {
  display: 'flex',
  marginLeft: '20px',
};

export default Header;
