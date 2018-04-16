import { Layout, Divider } from 'antd';
import React from 'react'
import StartUpCard from "./StartUpCard.js"
import Filter from "./Filter.js"
import DropDown from "./DropDown.js"


const { Header, Content, Sider, Footer } = Layout
const URL = 'http://localhost:3000/api/v1/start_ups'


class StartUpList extends React.Component {

  state = {
    startUps: [],
    value: "",
    filteredStartUps: [],
    dropDownVal: ""
  }

  componentDidMount(){
    this.fetchStartUps()
  }

  fetchStartUps = () => {
    fetch(URL)
      .then(rep => rep.json())
      .then(startUps => this.setState({ startUps: startUps.data }))
  }

  makeStartUpCards = (start, end) => {
    return this.state.startUps.slice(start, end).map((startUp) =>  <StartUpCard key={startUp.id} startUp={startUp} username={this.props.username} />)
  }

  makeFilteredStartUpCards = (start, end) => {
    return this.state.filteredStartUps.slice(start, end).map((startUp) =>  <StartUpCard key={startUp.id} startUp={startUp} username={this.props.username} />)
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value
    }, () => {
      this.setState({
        filteredStartUps: this.state.startUps.filter((startUp) => {return startUp.attributes.name.toLowerCase().includes(this.state.value)})
      })
    })
  }

  onDropDownChange = (event) => {
    this.setState({
      dropDownVal: event,
      filteredStartUps: this.state.startUps.filter((startUp) => startUp.attributes.field.toLowerCase() === event.toLowerCase())
    })
  }

  render() {
    return(
      <div style={{margin:'1% 4%'}}>
        <Header style={{background: 'white'}}>
          <h1>Your startups favorite startups</h1>
        </Header>
        <Filter onChange={this.onChange}/>
        <DropDown onChange={this.onDropDownChange}/>
        <Divider />
          {this.state.filteredStartUps.length > 0 ? <div className='start-up-container'>{this.makeFilteredStartUpCards()}</div> : <div className='start-up-container'>{this.makeStartUpCards()}</div>}
      </div>
    )
  }
}

export default StartUpList
