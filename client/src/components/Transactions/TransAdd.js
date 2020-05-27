import React, { useContext, useState } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';

const TransAdd = () => {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const { addTransaction } = useContext(TransactionsContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!label) {
      alert('please set a transaction label');
      return;
    }

    if (!amount || +amount === 0) {
      alert('Please set the transaction amount.');
      return;
    }

    addTransaction(label, +amount);
    setLabel('');
    setAmount('');
  };

  return (
    <div className='add-transaction-container'>
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit} className='form-add-transaction'>
        <div className='form-control'>
          <label>Label</label>
          <input
            type='text'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder='Enter transaction label...'
          />
        </div>

        <div className='form-control'>
          <label>Ammount</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter transation ammount...'
          />
          <small>Use (-) sign for expense, (+) sign for income</small>
        </div>

        <button type='submit' className='btn'>
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransAdd;
