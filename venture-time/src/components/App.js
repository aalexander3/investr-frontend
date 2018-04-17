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
      signingUp: false,
      username: '',
      password: '',
      passwordConfirmation: '',
      name: '',
      misison: '',
      description: '',
      interests: '',
      url: '',
      logo: '',
      type: '',
      funds_to_invest: 0
    },
    investors: [],
    startUps: [],
    currentUser: null
  }

  componentDidMount() {
    this.fetchUser()
    this.fetchStartUp()
  }

  fetchStartUp = () => {
    fetch(startUpURL)
      .then(resp => resp.json())
      .then(startUps => this.setState({ startUps: startUps.data }))
  }

  fetchUser = () => {
    fetch(URL)
      .then(resp => resp.json())
      .then(investors => this.setState({investors: investors.data }))
  }

  submitForm = (history) => {
  if (this.state.form.signingUp) {
    this.register(history)
  } else if (this.state.form.username !== '') {
    this.setState({
      form: {
        ...this.state.form,
        loggedIn: true
      },
      currentUser: this.findUser()
    }, () => {
      history.push("/settings")
    })}
  }

  register = (history) => {
    if (this.state.form.type === 'startup') {
      fetch(startUpURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(this.state.form)
      }).then(json => {
        console.log(json)
        this.setState({
          signingUp: false
        }, () => this.submitForm(history))
      })
    } else if (this.state.form.type === 'investor') {
      fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(this.state.form)
      }).then(json => {
        this.setState({
          signingUp: false
        }, () => this.submitForm(history))
      })
    }

  }

  handleChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value
      }
    })
  }

  onDropDownChange = event => {
    this.setState({
      form: {
        ...this.state.form,
        type: event
      }
    }, () => console.log(this.state.form.type))
  }

  logout = (event) => {
    this.setState({
      form:  {
        loggedIn: false,
        signingUp: false,
        username: '',
        password: '',
        passwordConfirmation: '',
        misison: '',
        description: '',
        interests: '',
        url: '',
        logo: '',
        type: ''
      },
      currentUser: null
    })
  }

  signUpClick = (e) => {
    console.log('sign up clicked');
    this.setState({
      form: {
        ...this.state.form,
        signingUp: !this.state.form.signingUp
      }
    })
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
            loggedIn={this.state.form.loggedIn}
            username={this.state.form.username}
            password={this.state.form.password}
            startUps={this.state.startUps}
            investors={this.state.investors}
            currentUser={this.state.currentUser}
          />
          }} />
        <Route exact path='/login' render={ (renderProps) => {
          return <Login submitForm={this.submitForm}
            signingUp={this.state.form.signingUp}
            onDropDownChange={this.onDropDownChange}
            signUpClick={this.signUpClick}
            form={this.state.form}
            history={ renderProps.history }
            register={this.register}
            handleChange={this.handleChange}/>
          }} />
        <Route exact path='/settings' render={ (renderProps) => {
          return <SettingsPage
            loggedIn={this.state.form.loggedIn}
            filterUser={this.findUser}
            investors={this.state.investors}
            username={this.state.form.username}
            password={this.state.form.password}/>
          }} />
          <Route exact path='/messages' render={ (renderProps) => {
            return <MessagePage
              loggedIn={this.state.form.loggedIn}
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
