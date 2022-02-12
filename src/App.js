import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Wallet from './pages/Wallet/Wallet';
import Header from './components/Header';

function App() {
  return (
    <>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira">
        <div style={ { backgroundColor: '#f0f0f0', height: '100vh' } }>
          <Header />
          <Wallet />
        </div>
      </Route>
    </>
  );
}

export default App;
