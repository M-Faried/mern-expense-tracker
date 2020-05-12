import React, { useContext, Fragment } from 'react';
import TransItem from './TransItem';
import { TransactionsContext } from './context/TransactionsContext';

const TransList = () => {
  const { transactions } = useContext(TransactionsContext);

  return (
    <Fragment>
      <h3>History</h3>
      <ul className='list'>
        {transactions.map((tr) => (
          <TransItem key={tr.id} transaction={tr} />
        ))}
      </ul>
    </Fragment>
  );
};

export default TransList;
