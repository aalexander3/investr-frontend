import React from 'react'
import InvestorList from './InvestorList'

// import { Form, Icon } from 'antd';

class SettingsPage extends React.Component {

  render() {
    return(
      <div>
        <InvestorList investors={this.props.investors} filterUser={this.props.filterUser} username={this.props.username}/>
      </div>
    )
  }
}



export default SettingsPage
