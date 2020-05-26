import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [state, setState] = useState({
    user: null,
    error: null,
    isAuthenticated: false,
    isLoading: false,
  });

  //Helper: Wipes the tokens and the current user data
  const authReset = () => {
    //Removing the tokenf rom the local storage.
    localStorage.removeItem('token');

    //Removing the token from axios global configurations.
    setAuthToken(null);

    //Restting the state.
    setState({
      ...state,
      user: null,
      isAuthenticated: false,
    });
  };

  //Helper: Registers or logins the user and stores user token in state
  const fetchUserToken = async (userData, newUser) => {
    const fetchLink = newUser ? '/api/user/register' : '/api/user/login';

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      setState({ ...state, isLoading: true });
      const res = await axios.post(fetchLink, userData, config);
      localStorage.setItem('token', res.data.token);
      setState({
        ...state,
        error: null,
        isAuthenticated: true,
        isLoading: false,
      });
      loadUser();
    } catch (err) {
      authReset();
      setState({ ...state, isLoading: false, error: err.response.data.error });
    }
  };

  //Create a new user
  const register = async (userData) => {
    fetchUserToken(userData, true);
  };

  //Login user
  const login = async (userData) => {
    fetchUserToken(userData, false);
  };

  // Gets the user corresponding to the current user.
  const loadUser = async () => {
    try {
      setAuthToken(localStorage.token);
      setState({ ...state, isLoading: true });
      const res = await axios.get('/api/user');
      setState({
        ...state,
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      authReset();
      setState({ ...state, isLoading: false, error: err.response.data.error });
    }
  };

  //Logout user
  const logout = () => {
    authReset();
  };

  //Clear errors
  const clearError = () => {
    setState({
      ...state,
      error: null,
    });
  };

  const services = {
    ...state,
    register,
    login,
    loadUser,
    logout,
    clearError,
  };

  return (
    <UserContext.Provider value={services}>
      {props.children}
    </UserContext.Provider>
  );
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
