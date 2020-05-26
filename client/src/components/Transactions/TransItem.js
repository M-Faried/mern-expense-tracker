import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TransactionsContext } from '../../context/TransactionsContext';

export const TransItem = (props) => {
  const { deleteTransaction } = useContext(TransactionsContext);
  const { _id, label, amount } = props.transaction;

  const trClass = amount > 0 ? 'plus' : 'minus';
  const formattedAmount =
    amount > 0 ? `+$${Math.abs(amount)}` : `-$${Math.abs(amount)}`;

  return (
    <li className={trClass}>
      {label} <span>{formattedAmount}</span>
      <button className='delete-btn' onClick={() => deleteTransaction(_id)}>
        X
      </button>
    </li>
  );
};

TransItem.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default TransItem;
