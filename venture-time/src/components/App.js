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
const startUpURL = "http://localhost:3000/api/v1/start_ups"


class App extends Component {
  state = {
    form: {
      loggedIn: false,
      username: 'pilotworks',
      password: ''
    },
    investors: [],
    startUps: [],
    currentUser: null
  }

  submitForm = (history) => {

    this.setState({
      form: {
        ...this.state.form,
        loggedIn: true
      },
      currentUser: this.findUser()
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
      },
      currentUser: null
    })
  }

  componentDidMount() {
    console.log('app mounted');
    this.fetchUser()
    this.fetchStartUp()
  }

  fetchStartUp = () => {
    fetch(startUpURL)
      .then(resp => resp.json())
      .then(startUps => this.setState({ startUps: startUps.data }))
  }

  filterStartUp = () => {
    return this.state.startUps.filter(startUp => {
      return startUp.attributes.username === this.state.form.username
    })[0]
  }

  findUser = () => {
    let user = this.filterStartUp()
    user ? null : user = this.filterUser()
    return user
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
            startUps={this.state.startUps}
            investors={this.state.investors}
            currentUser={this.state.currentUser}
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
            filterUser={this.findUser}
            investors={this.state.investors}
            username={this.state.form.username}
            password={this.state.form.password}/>
          }} />
          <Route exact path='/messages' render={ (renderProps) => {
            return <MessagePage
              currentUser={this.state.currentUser}
              filterUser={this.findUser}
              investors={this.state.investors}
              username={this.state.form.username}
              password={this.state.form.password} />
            }} />
      </div>
    );
  }
}

export default App;
