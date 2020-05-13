import React, { createContext, useState } from 'react';
import axios from 'axios';

export const TransactionsContext = createContext();

export const TransactionsContextProvider = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [dataLoaded, setDataLoaded] = useState(false);

  const loadDatabaseTransactions = async () => {
    setLoading(true);

    try {
      const res = await axios.get('/api/v1/transactions');
      setTransactions(res.data.data);
    } catch (err) {
      console.log(err.response.data.error);
    }

    setLoading(false);
  };

  const addTransaction = async (label, amount) => {
    if (!label) return;
    if (!amount || +amount === 0) return;

    // const newTransaction = {
    //   id: uuid.v4(),
    //   label,
    //   amount,
    // };
    // const updatedTransactions = [newTransaction, ...transactions];
    // setTransactions(updatedTransactions);
    // saveTransactions(updatedTransactions);

    setLoading(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const transaction = { label, amount };
    try {
      const res = await axios.post(`/api/v1/transactions`, transaction, config);
      const updatedTransactions = [res.data.data, ...transactions];
      setTransactions(updatedTransactions);
    } catch (err) {
      console.log(err.response.data.error);
    }

    setLoading(false);
  };

  const deleteTransaction = async (id) => {
    // const updatedTransactions = transactions.filter((tr) => tr.id !== id);
    // setTransactions(updatedTransactions);
    // saveTransactions(updatedTransactions);

    setLoading(true);

    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      const updatedTransactions = transactions.filter((tr) => tr._id !== id);
      setTransactions(updatedTransactions);
    } catch (err) {
      console.log(err.response.data.error);
    }

    setLoading(false);
  };

  // if (!dataLoaded) {
  //   const storedData = getSavedTransactions();
  //   setTransactions(storedData);
  //   setDataLoaded(true);
  // }

  const providedServices = {
    transactions,
    loading,
    loadDatabaseTransactions,
    addTransaction,
    deleteTransaction,
  };

  return (
    <TransactionsContext.Provider value={providedServices}>
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
function saveTransactions(transactions) {
  localStorage.setItem('simple-expense-tracker', JSON.stringify(transactions));
}
