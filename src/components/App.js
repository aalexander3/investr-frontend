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
    let token = this._getToken()
    if (token) {
      SessionsAdapter.reauth(token)
        .then(user => this.loginUser(user.data))
    }
  }

  fetchStartUp = () => {
    return StartUpsAdapter.index()
      .then(startUps => this.setState({ startUps: startUps.data }))
  }

  fetchInvestors = () => {
    return InvestorsAdapter.index()
      .then(investors => this.setState({ investors: investors.data }))
  }

  submitForm = () => {
    if (this.state.form.signingUp) {
      this.register()
    } else if (this.state.form.username !== '') {
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
        })
    }
  }

  _setToken = token => (localStorage.setItem('token', token))

  _getToken = () => (localStorage.getItem('token'))

  _removeToken = () => (localStorage.removeItem('token'))

  loginUser = user => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        loggedIn: true
      },
      currentUser: user
    }, () => this.props.history.push('/')
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
            this.setState({
              investors: json.data,
              form: {
                ...this.state.form,
                signingUp: false
              }
            }, () => this.props.history.push('/'))
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
    this._removeToken()
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

  render() {
    return (
      <div>
        <NavBar loggedIn={this.state.form.loggedIn} logout={this.logout}/>
        <Route exact path='/' render={ (renderProps) => {
          return <MatchPage
            loggedIn={this.state.form.loggedIn}
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
            handleChange={this.handleChange}/>
          }} />
        <Route exact path='/settings' render={ (renderProps) => {
          return <SettingsPage
            loggedIn={this.state.form.loggedIn}
            investor={this.state.currentUser} />
          }} />
          <Route exact path='/messages' render={ (renderProps) => {
            return <MessagePage
              loggedIn={this.state.form.loggedIn}
              currentUser={this.state.currentUser} />
            }} />
      </div>
    );
  }
}

export default withRouter(App)
