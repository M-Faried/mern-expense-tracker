import React, { createContext, useState } from 'react';
import axios from 'axios';

export const TransactionsContext = createContext();

export const TransactionsContextProvider = (props) => {
  const [state, setState] = useState({
    transactions: [],
    isLoading: false,
  });

  const loadDatabaseTransactions = async () => {
    try {
      setState((ps) => ({ ...ps, isLoading: true }));
      const res = await axios.get('/api/transactions');
      setState((ps) => ({
        ...ps,
        isLoading: false,
        transactions: res.data.data,
      }));
    } catch (err) {
      setState((ps) => ({ ...ps, isLoading: false }));
      console.log(err.response.data.error);
    }
  };

  const addTransaction = async (label, amount) => {
    if (!label) return;
    if (!amount || +amount === 0) return;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const transaction = { label, amount };

    try {
      setState((ps) => ({ ...ps, isLoading: true }));
      const res = await axios.post(`/api/transactions`, transaction, config);

      setState((ps) => ({
        ...ps,
        isLoading: false,
        transactions: [res.data.addedTransaction, ...ps.transactions],
      }));
    } catch (err) {
      setState((ps) => ({ ...ps, isLoading: false }));
      console.log(err.response.data.error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setState((ps) => ({ ...ps, isLoading: true }));

      const res = await axios.delete(`/api/transactions/${id}`);

      setState((ps) => ({
        ...ps,
        isLoading: false,
        transactions: ps.transactions.filter(
          (tr) => tr._id !== res.data.deletedTransaction._id
        ),
      }));
    } catch (err) {
      setState((ps) => ({ ...ps, isLoading: false }));
      console.log(err.response.data.error);
    }
  };

  const services = {
    ...state,
    loadDatabaseTransactions,
    addTransaction,
    deleteTransaction,
  };

  return (
    <TransactionsContext.Provider value={services}>
      {props.children}
    </TransactionsContext.Provider>
  );
};

///////////////////////////////////////////Helper Functions
// const SAMPLE_TRANSACTIONS = [
//   { id: uuid.v4(), label: 'Flower', amount: -20 },
//   { id: uuid.v4(), label: 'Salary', amount: 300 },
//   { id: uuid.v4(), label: 'Book', amount: -10 },
//   { id: uuid.v4(), label: 'Camera', amount: 150 },
// ];

// function getSavedTransactions() {
//   let storedTransactions = JSON.parse(
//     localStorage.getItem('simple-expense-tracker')
//   );

//   if (storedTransactions) return storedTransactions;
//   else return SAMPLE_TRANSACTIONS;
// }
// function saveTransactions(transactions) {
//   localStorage.setItem('simple-expense-tracker', JSON.stringify(transactions));
// }
