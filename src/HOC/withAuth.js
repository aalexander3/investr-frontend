import React from 'react'
import {Redirect} from 'react-router'

const withAuth = (WrappedComponent) => {
  return (props) => {
    return props.loggedIn ?
      <WrappedComponent { ...props } />
      :
      (<Redirect to="/login" errors="You must be logged in to access that page!"/>)
  }
}

export default withAuth
