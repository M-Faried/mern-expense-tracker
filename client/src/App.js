import React from 'react';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import TransAdd from './components/TransAdd';
import TransList from './components/TransList';
import { TransactionsContextProvider } from './context/TransactionsContext';
import './App.css';

function App() {
  return (
    <TransactionsContextProvider>
      <div className='App'>
        <Header />

        <div className='container'>
          <div className='trans-management-container'>
            <Dashboard />
            <TransAdd />
          </div>
          <div className='transaction-list-container'>
            <TransList />
          </div>
        </div>
      </div>
    </TransactionsContextProvider>
  );
}

export default App;
