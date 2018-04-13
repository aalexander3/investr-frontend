import React from 'react'
import InvestorList from './InvestorList'

// import { Form, Icon } from 'antd';

class SettingsPage extends React.Component {

  render() {
    console.log(this.props);
    return(
      <div>
        <InvestorList username={this.props.username}/>
      </div>
    )
  }
}



export default SettingsPage
