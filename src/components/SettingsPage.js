import React, { Component } from 'react'
import InvestorCard from './InvestorCard'
import InvestorSidebar from './InvestorSidebar'

import withAuth from '../HOC/withAuth'
import '../styles/Settings.css'
import { Layout } from 'antd';
const { Content } = Layout

const URL = 'http://localhost:3000/api/v1/start_up_investors'

class SettingsPage extends Component {

  state = {
    connections: []
  }

  componentDidMount = () => {
    // fetches all connections ? then filters them and structures the data
    // this could probably be muuuuch better with auth -- refactor here
    fetch(URL).then(res => res.json()).then(json => {
      let newFilter = [];
      if (this.props.investor.type === "investors") {
        const filteredList = json.data.filter(connection => connection.attributes.investor.username === this.props.username)
        newFilter = filteredList.map(connection => {
          const { name, logo, url } = connection.attributes['start-up']
          return { name, logo, url }
        })
      } else {
          const filteredList = json.data.filter(connection => connection.attributes['start-up'].username === this.props.username)
          newFilter = filteredList.map(connection => {
            const { name, logo, url } = connection.attributes.investor
            return { name, logo, url }
          })
      }

      this.setState({
        connections: newFilter
      })
    })
  }

  makeInvestorCard = () => {
    if (this.props.username){
      const filteredUser = this.props.investor
      return <InvestorCard attributes={filteredUser.attributes} connections={this.state.connections} />
    }
  }

  render() {
    return(
      <div>
        <Layout hasSider={true}>
          <Content>
            {this.makeInvestorCard()}
          </Content>
            <InvestorSidebar connections={this.state.connections} />
        </Layout>
      </div>

    )
  }
}

export default withAuth(SettingsPage)
