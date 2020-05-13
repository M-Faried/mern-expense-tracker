import React, { useContext, useEffect, Fragment } from 'react';
import TransItem from './TransItem';
import Spinner from './layout/Spinner';
import { TransactionsContext } from '../context/TransactionsContext';

const TransList = () => {
  const { transactions, loading, loadDatabaseTransactions } = useContext(
    TransactionsContext
  );

  useEffect(() => {
    loadDatabaseTransactions();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Fragment>
        <h3>History</h3>
        <Spinner />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h3>History</h3>
        <ul className='list'>
          {transactions.map((tr) => (
            <TransItem key={tr._id} transaction={tr} />
          ))}
        </ul>
      </Fragment>
    );
  }
};

export default TransList;
