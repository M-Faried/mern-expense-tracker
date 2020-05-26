import React, { useContext, useState, useEffect } from 'react';
import Alerts from '../layout/Alerts';
import { AlertContext } from '../../context/AlertContext';
import { UserContext } from '../../context/UserContext';

const emptyUser = {
  email: '',
  password: '',
};

const Login = (props) => {
  //Preparing contexts
  const { showAlert } = useContext(AlertContext);
  const { isAuthenticated, error, login, clearError } = useContext(UserContext);

  useEffect(() => {
    //Directing the user to the home page if he is authenticated.
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      showAlert(error);
      clearError();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated]);

  //Preparing component state.
  const [user, setUser] = useState(emptyUser);
  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(email && password)) {
      showAlert('Please enter all fields to register');
    } else {
      login({ email, password });
    }
  };

  return (
    <div>
      <Alerts />
      <form onSubmit={onSubmit} className='form-auth'>
        <h2>Account Login</h2>
        <div className='form-control'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
            autoComplete='true'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
            autoComplete='true'
          />
        </div>
        <input type='submit' value='Login' className='btn' />
      </form>
    </div>
  );
};

export default Login;
