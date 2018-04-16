import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import '../App.css';
// Components
import NavBar from './NavBar'
import Login from './Login'
import SettingsPage from './SettingsPage'
import MatchPage from './MatchPage'
import MessagePage from './MessagePage'

const URL = "http://localhost:3000/api/v1/investors"

class App extends Component {
  state = {
    form: {
      loggedIn: false,
      username: 'arren',
      password: ''
    },
    investors: []
  }

  submitForm = (history) => {
    this.setState({
      form: {
        ...this.state.form,
        loggedIn: true
      }
    }, () => {
      history.push("/settings")
    })
  }

  handleChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
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

  componentDidMount() {
    console.log('app mounted');
    this.fetchUser()
  }

  fetchUser = () => {
    fetch(URL)
      .then(resp => resp.json())
      .then(investors => this.setState({investors: investors.data }))
  }

  filterUser = () => {
    return this.state.investors.filter(investor => {
      return investor.attributes.username === this.state.form.username
    })[0]
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
            filterUser={this.filterUser}
            investors={this.state.investors}
            username={this.state.form.username}
            password={this.state.form.password}/>
          }} />
          <Route exact path='/messages' render={ (renderProps) => {
            return <MessagePage
              filterUser={this.filterUser}
              investors={this.state.investors}
              username={this.state.form.username}
              password={this.state.form.password} />
            }} />
      </div>
    );
  }
}

export default App;
