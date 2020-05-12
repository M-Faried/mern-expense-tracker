import React, { useContext } from 'react';
import { TransactionsContext } from './context/TransactionsContext';

const Dashboard = () => {
  const { transactions } = useContext(TransactionsContext);

  // const totalOverall = transactions
  //   .reduce((acc, tr) => acc + tr.amount, 0)
  //   .toFixed(2);
  // const totalIncome = transactions
  //   .filter((tr) => tr.amount > 0)
  //   .reduce((acc, tr) => acc + tr.amount, 0)
  //   .toFixed(2);
  // const totalExpense = transactions
  //   .filter((tr) => tr.amount < 0)
  //   .reduce((acc, tr) => acc + tr.amount, 0)
  //   .toFixed(2);

  const summary = { income: 0, expense: 0, total: 0 };
  transactions.forEach((tr) => {
    summary.total += tr.amount;
    if (tr.amount > 0) summary.income += tr.amount;
    else summary.expense += tr.amount;
  });

  return (
    <div className='balance-container'>
      <h4>Your Balance</h4>
      <h1>${summary.total.toFixed(2)} </h1>

      <div className='inc-exp-container'>
        <div>
          <h4>Income</h4>
          <p className='money plus'>+${summary.income.toFixed(2)}</p>
        </div>

        <div>
          <h4>Expense</h4>
          <p className='money minus'>
            -${Math.abs(summary.expense).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
