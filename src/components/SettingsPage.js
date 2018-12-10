import React from 'react'
import InvestorList from './InvestorList'
import withAuth from '../HOC/withAuth'
import '../styles/Settings.css'

class SettingsPage extends React.Component {

  render() {
    return(
      <div>
        <InvestorList investors={this.props.investors} filterUser={this.props.filterUser} username={this.props.username}/>
      </div>
    )
  }
}

export default withAuth(SettingsPage)
