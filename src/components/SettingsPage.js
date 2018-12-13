import React, { Component } from 'react'
import InvestorCard from './InvestorCard'
import InvestorSidebar from './InvestorSidebar'

import withAuth from '../HOC/withAuth'
import '../styles/Settings.css'
import { Layout } from 'antd';
const { Content } = Layout

class SettingsPage extends Component {

  mapConnections = () => {
      const whatType = this.props.currentUser.type === "investor" ? 'start_ups' : 'investors'
      return this.props.currentUser.attributes[whatType].map(connection => {
        const { name, logo, url } = connection

        return { name, logo, url }
      })
  }

  makeInvestorCard = () => {
    if (this.props.currentUser.attributes){
      const filteredUser = this.props.currentUser
      return <InvestorCard attributes={filteredUser.attributes} connections={this.mapConnections()} />
    }
  }

  render() {
    return (
      <div>
        <Layout hasSider={true}>
          <Content>
            {this.makeInvestorCard()}
          </Content>
            <InvestorSidebar connections={this.mapConnections()} />
        </Layout>
      </div>

    )
  }
}

export default withAuth(SettingsPage)
