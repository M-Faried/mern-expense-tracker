import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../../context/UserContext';
import { AlertContext } from '../../context/AlertContext';

const emptyUser = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

const Register = (props) => {
  //Preparing contexts
  const { showAlert } = useContext(AlertContext);
  const { error, isAuthenticated, register, clearError } = useContext(
    UserContext
  );

  useEffect(() => {
    //Directing the user to the home page ijf he is authenticated.
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
  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    if (!(name && email && password)) {
      showAlert('Please enter all fields to register');
    } else if (password !== password2) {
      showAlert("Passwords don't match");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className='form-auth'>
      <h2>Account Register</h2>
      <form onSubmit={onSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
            autoComplete='true'
          />
        </div>
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
        <div className='form-control'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
            autoComplete='true'
          />
        </div>

        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
