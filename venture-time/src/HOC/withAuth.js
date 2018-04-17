import React from 'react'
import {Redirect} from 'react-router'

const withAuth = (WrappedComponent) => {
  return (props) => {
    return props.auth.loggingIn || props.auth.loggedIn ?
      //don't do WrappedComponent(props) because only functional
      // components will work
      <WrappedComponent { ...props } />
      :
      (<Redirect to="/login" />)
  }
}

export default withAuth
