import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Logo from './Logo';

const Navbar = () => {
  const { isAuthenticated, user, loadUser, logout } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) loadUser();
    //eslint-disable-next-line
  }, []);

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/'>
          <i className='fa fa-user'></i>
          {user && <span className='hide-sm'>{user.name}</span>}
        </Link>
      </li>
      <li>
        <a href='#!' onClick={() => logout()}>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>{' '}
        </a>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/'>Login</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <div className='logo-container'>
        <Logo />
        <span className='title'>
          <Link to='/about'> Expense Tracker</Link>
        </span>
      </div>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;
