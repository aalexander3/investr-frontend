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
    // double set state
    this.setState({
      form: {
        ...this.state.form,
        loggedIn: !this.state.form.loggedIn
      }
    }, () => {
      history.push("/")
      //lets remember how to do pushState(state, title, url)
    })
  }

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    }, () => console.log(this.state.form))
  }

  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={MatchPage}/>
        <Route exact path='/login' render={ (renderProps) => {
          return <Login submitForm={this.submitForm}
            username={this.state.form.username}
            password={this.state.form.password}
            history={ renderProps.history }
            handleChange={this.handleChange}/>
          }} />
        <Route exact path='/settings' component={SettingsPage}/>
        <Route exact path='/messages' component={MessagePage}/>

      </div>
    );
  }
}

export default App;
