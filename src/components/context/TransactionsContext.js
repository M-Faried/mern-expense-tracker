import React, { createContext, useState } from 'react';
import * as uuid from 'uuid';

export const TransactionsContext = createContext();

export const TransactionsContextProvider = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const addTransaction = (label, amount) => {
    if (!label) return;
    if (!amount || +amount === 0) return;

    const newTransaction = {
      id: uuid.v4(),
      label,
      amount,
    };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((tr) => tr.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  if (!dataLoaded) {
    const storedData = getSavedTransactions();
    setTransactions(storedData);
    setDataLoaded(true);
  }

  const providedServices = {
    transactions,
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
const SAMPLE_TRANSACTIONS = [
  { id: uuid.v4(), label: 'Flower', amount: -20 },
  { id: uuid.v4(), label: 'Salary', amount: 300 },
  { id: uuid.v4(), label: 'Book', amount: -10 },
  { id: uuid.v4(), label: 'Camera', amount: 150 },
];

function getSavedTransactions() {
  let storedTransactions = JSON.parse(
    localStorage.getItem('simple-expense-tracker')
  );

  if (storedTransactions) return storedTransactions;
  else return SAMPLE_TRANSACTIONS;
}
function saveTransactions(transactions) {
  localStorage.setItem('simple-expense-tracker', JSON.stringify(transactions));
}
