import React, { useContext, Fragment } from 'react';

import TransAdd from '../Transactions/TransAdd';
import TransList from '../Transactions/TransList';
import Dashboard from '../Transactions/Dashboard';
import Login from '../auth/Login';
import Spinner from '../layout/Spinner';

import { UserContext } from '../../context/UserContext';

const Home = () => {
  const { isLoading, isAuthenticated } = useContext(UserContext);

  if (isLoading) return <Spinner />;

  if (!isAuthenticated) return <Login />;

  return (
    <Fragment>
      <div className='trans-management-container'>
        <Dashboard />
        <TransAdd />
      </div>
      <div className='transaction-list-container'>
        <TransList />
      </div>
    </Fragment>
  );
};

export default Home;
