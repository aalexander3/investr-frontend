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
  state = {
    form: {
      loggedIn: false,
      username: '',
      password: ''
    }
  }

  submitForm = (history) => {
    console.log('wow form submitted');
    this.setState({
      form: {
        ...this.state.form,
        loggedIn: true
      }
    }, () => {
      console.log(this.state.form);
      history.push("/settings")
    })
  }

  handleChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    }, () => console.log(this.state.form))
  }

  logout = (event) => {
    this.setState({
      form:  {
        loggedIn: false,
        username: '',
        password: ''
      }
    })
  }

  render() {
    return (
      <div>
        <NavBar loggedIn={this.state.form.loggedIn} logout={this.logout}/>
        <Route exact path='/' render={ (renderProps) => {
          return <MatchPage
            username={this.state.form.username}
            password={this.state.form.password}
          />
          }} />
        <Route exact path='/login' render={ (renderProps) => {
          return <Login submitForm={this.submitForm}
            username={this.state.form.username}
            password={this.state.form.password}
            history={ renderProps.history }
            handleChange={this.handleChange}/>
          }} />
        <Route exact path='/settings' render={ (renderProps) => {
          return <SettingsPage
            username={this.state.form.username}
            password={this.state.form.password}/>
          }} />
          <Route exact path='/messages' render={ (renderProps) => {
            return <MessagePage
              username={this.state.form.username}
              password={this.state.form.password}/>
            }} />
      </div>
    );
  }
}

export default App;
