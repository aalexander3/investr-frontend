import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import '../App.css';
// Components
import NavBar from './NavBar'
import Login from './Login'
import SettingsPage from './SettingsPage'
import MatchPage from './MatchPage'
import MessagePage from './MessagePage'


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={MatchPage}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/settings' component={SettingsPage}/>
        <Route exact path='/messages' component={MessagePage}/>
        <NavBar />

      </div>
    );
  }
}

export default App;
