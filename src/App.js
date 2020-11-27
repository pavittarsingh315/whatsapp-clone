import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">

      <div className='app__body'>
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/chats/:chatId" component={Chat} />
            <Route path="/" component={Chat} />
          </Switch>
        </Router>
      </div>

    </div>
  );
};

export default App;
