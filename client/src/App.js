import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';

import { UserContextProvider } from './context/UserContext';
import { TransactionsContextProvider } from './context/TransactionsContext';
import { AlertContextProvider } from './context/AlertContext';

import './App.css';

function App() {
  return (
    <UserContextProvider>
      <TransactionsContextProvider>
        <AlertContextProvider>
          <Router>
            <Navbar />
            <div className='App'>
              <div className='container'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertContextProvider>
      </TransactionsContextProvider>
    </UserContextProvider>
  );
}

export default App;
