import React, { useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import Login from './Components/Login';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from './StateProvider';

function App() {

  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {/* ternary operator says if user is null/false show login else show the app */}
      {!user ? (
        <Login />
      ): (
        <div className='app__body'>
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/chats/:chatId" component={Chat} />
              <Route path="/" component={Chat} />
            </Switch>
          </Router>
        </div>
      )}

    </div>
  );
};

export default App;
