import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NavTab } from 'react-router-tabs';
import Header from './components/Header/Header';
import DataEntry from './components/DataEntry/DataEntry';
import Dashboard from './components/Dashboard/Dashboard';
import About from './components/About/About';
import './App.css';
import 'react-router-tabs/styles/react-router-tabs.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="navbar-wrapper">
        <NavTab to="/dataentry">Data Entry</NavTab>
        <NavTab to="/dashboard">Dashboard</NavTab>
        <NavTab to="/about">About</NavTab>
      </div>

      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dataentry" />} />
        <Route path="/dataentry" component={DataEntry} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
