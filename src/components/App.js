import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import '../styles/App.css';
// Components
import NavBar from './NavBar'
import Login from './Login'
import SettingsPage from './SettingsPage'
import MatchPage from './MatchPage'
import MessagePage from './MessagePage'
import { StartUpsAdapter, InvestorsAdapter, SessionsAdapter } from '../adapters/Adapter.js'

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
    // check for login - in localStorage
  }

  fetchStartUp = () => {
    StartUpsAdapter.index()
      .then(startUps => this.setState({ startUps: startUps.data }))
  }

  fetchInvestors = () => {
    InvestorsAdapter.index()
      .then(investors => this.setState({ investors: investors.data }))
  }

  submitForm = () => {
    if (this.state.form.signingUp) {
      this.register()
    } else if (this.state.form.username !== '') {
        // request to sessions controller
        // try login
        const { username, password } = this.state.form
        const loginObj = { username, password }

        SessionsAdapter.login(loginObj)
          .then(json => {
            let { user, token } = json
            console.log(user)
            this._setToken(token)
            if (user) {
              this.loginUser(user.data)
            }
            // save token into local storage
            // setState of currentUser  && logged in (like below)
        })
    }
  }

  _setToken = token => (localStorage.setItem('token', token))

  _getToken = () => (localStorage.getItem('token'))

  loginUser = user => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        loggedIn: true
      },
      currentUser: user
    }, () => this.props.history.push("/")
  )}


  register = () => {
    if (this.state.form.type === 'startup') {
      StartUpsAdapter.create(this.state.form)
        .then(json => {
          this.setState({
            startUps: json.data,
            form: {
              ...this.state.form,
              signingUp: false
            }
          }, () => this.props.history.push('/'))
        })

    } else if (this.state.form.type === 'investor') {
        InvestorsAdapter.create(this.state.form)
          .then(json => {
            console.log(json)
            // this.setState({
            //   investors: json.data,
            //   form: {
            //     ...this.state.form,
            //     signingUp: false
            //   }
            // })
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

  logout = () => {
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
            investor={this.state.currentUser}
            username={this.state.form.username} />
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

export default withRouter(App)
