import React, { Component } from 'react'
import withAuth from '../HOC/withAuth'
import StartUpList from "./StartUpList.js"
import Filter from "./Filter.js"
import DropDown from "./DropDown.js"
import { Divider } from 'antd'

import '../styles/Match.css'

import { Layout } from 'antd';
const { Header } = Layout

class MatchPage extends Component {

  state = {
    value: "",
    dropDownVal: "all"
  }

  onChange = e => this.setState({ value: e.target.value })

  filterObject = obj => obj.attributes.name.toLowerCase().includes(this.state.value)

  onDropDownChange = e => this.setState({ dropDownVal: e })

  filterStartUps = () => {
    const { startUps, currentUser } = this.props
    const { dropDownVal } = this.state
    return startUps.filter(startUp => {
      if (currentUser.type === 'investor') {
        return (startUp.attributes.field.toLowerCase() === dropDownVal.toLowerCase() || dropDownVal === 'all') && this.filterObject(startUp)
      } else {
        return this.filterObject(startUp)
      }
    })
  }

  render(){
    const { currentUser, startUps} = this.props

    return (
      <div style={{margin:'1% 4%'}}>
        <Header style={{background: 'white'}}>
          {currentUser.type === 'investor' ? <h1>Your startups favorite startups</h1> : <h1>I'm an investor, invested in investing</h1>}
        </Header>
        <Filter onChange={this.onChange} />
        {currentUser.type === 'investor' && <DropDown onChange={this.onDropDownChange}/>}
        <Divider />
        { startUps.length > 0 && <StartUpList
          username={currentUser.attributes.username}
          startUps={this.filterStartUps()}
          currentUser={currentUser} />}
      </div>
    )
  }
}

export default withAuth(MatchPage)
