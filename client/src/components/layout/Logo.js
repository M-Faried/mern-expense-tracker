import React, { Fragment } from 'react';
import logo from './logo.svg';

const Logo = () => {
  return (
    <Fragment>
      <img
        src={logo}
        alt='logo'
        style={{
          width: '30px',
          height: '30px',
          margin: 'auto 5px',
          display: 'inline-block',
        }}
      />
    </Fragment>
  );
};

export default Logo;
