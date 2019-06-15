import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Jokes from './Jokes';

class App extends Component {
  render() { 
    return (
      <div className="App">
        <h1>Dad Jokes Galore</h1>

        <ul>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
          <li><NavLink to="/jokes">Jokes</NavLink></li>
        </ul>

        <div>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/jokes" component={Jokes} />
        </div>
      </div>
    );
  }
}

export default App;