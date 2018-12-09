import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import '../App.css';
// Components
import NavBar from './NavBar'
import Login from './Login'
import SettingsPage from './SettingsPage'
import MatchPage from './MatchPage'
import MessagePage from './MessagePage'
import { StartUpsAdapter, InvestorsAdapter } from '../adapters/Adapter.js'

const URL = "http://localhost:3000/api/v1/investors"
const startUpURL = "http://localhost:3000/api/v1/start_ups"
const HEADERS = {
  'Content-Type': 'application/json',
  'Accepts': 'application/json'
}



class App extends Component {
  state = {
    form: {
      loggedIn: false,
      signingUp: false,
      username: '',
      password: '',
      password_confirmation: '',
      name: '',
      mission: '',
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
    this.fetchInvestors()
    this.fetchStartUp()
  }

  fetchStartUp = () => {
    StartUpsAdapter.index()
      .then(startUps => this.setState({ startUps: startUps.data }))
  }

  fetchInvestors = () => {
    InvestorsAdapter.index()
      .then(investors => this.setState({ investors: investors.data }))
  }

  submitForm = (history) => {
    if (this.state.form.signingUp) {
      this.register(history)
    } else if (this.state.form.username !== '') {
      let user = this.findUser()
      if (user) {
        this.setState({
          ...this.state,
          form: {
            ...this.state.form,
            loggedIn: true
          },
          currentUser: user
        }, () => {
          history.push("/settings")
        })}
      }
  }

  register = (history) => {
    if (this.state.form.type === 'startup') {
      fetch(startUpURL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(this.state.form)
      }).then(res => res.json()).then(json => {
        this.setState({
          startUps: json.data,
          form: {
            ...this.state.form,
            signingUp: false
          }
        }, () => this.submitForm(history))
      })

    } else if (this.state.form.type === 'investor') {
      fetch(URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(this.state.form)
      }).then(res => res.json()).then(json => {
        this.setState({
          investors: json.data,
          form: {
            ...this.state.form,
            signingUp: false
          }
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
    })
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
    this.setState({
      form: {
        ...this.state.form,
        signingUp: !this.state.form.signingUp
      }
    })
  }

  filterStartUp = () => {
    // make better with auth
    return this.state.startUps.find(startUp => startUp.attributes.username === this.state.form.username)
  }

  findUser = () => {
    let user = this.filterStartUp()
    if (!user) user = this.filterUser()
    return user
  }

  filterUser = () => {
    return this.state.investors.find(investor => investor.attributes.username === this.state.form.username)
  }

  render() {
    return (
      <div>
        <NavBar loggedIn={this.state.form.loggedIn} logout={this.logout}/>
        <Route exact path='/' render={ (renderProps) => {
          return <MatchPage
            loggedIn={this.state.form.loggedIn}
            username={this.state.form.username}
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
            history={ renderProps.history}
            register={this.register}
            handleChange={this.handleChange}/>
          }} />
        <Route exact path='/settings' render={ (renderProps) => {
          return <SettingsPage
            loggedIn={this.state.form.loggedIn}
            filterUser={this.findUser}
            // investors={this.state.investors}
            username={this.state.form.username}/>
          }} />
          <Route exact path='/messages' render={ (renderProps) => {
            return <MessagePage
              loggedIn={this.state.form.loggedIn}
              currentUser={this.state.currentUser}
              filterUser={this.findUser}
              investors={this.state.investors}
              username={this.state.form.username} />
            }} />
      </div>
    );
  }
}

export default App;
