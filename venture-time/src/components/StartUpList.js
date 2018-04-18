import { Layout, Divider } from 'antd';
import React from 'react'
import StartUpCard from "./StartUpCard.js"
import Filter from "./Filter.js"
import DropDown from "./DropDown.js"


const { Header } = Layout
const URL = 'http://localhost:3000/api/v1/start_ups'


class StartUpList extends React.Component {

  state = {
    startUps: [],
    investors: [],
    value: "",
    filteredStartUps: [],
    dropDownVal: ""
  }

  componentDidMount(){
    this.setState({
      startUps: this.props.startUps,
      investors: this.props.investors
    })
  }

  // fetchStartUps = () => {
  //   fetch(URL)
  //     .then(rep => rep.json())
  //     .then(startUps => this.setState({ startUps: startUps.data }))
  // }

  makeStartUpCards = (start, end) => {
    if (this.props.currentUser.type === "start-ups") {
      return this.state.investors.slice(start, end).map((investor) =>  <StartUpCard key={investor.id} startUp={investor} username={this.props.username} currentUser={this.props.currentUser} />)
    } else {
      return this.state.startUps.slice(start, end).map((startUp) =>  <StartUpCard key={startUp.id} startUp={startUp} username={this.props.username} currentUser={this.props.currentUser} />)
    }
  }

  makeFilteredStartUpCards = (start, end) => {
    return this.state.filteredStartUps.slice(start, end).map((startUp) =>  <StartUpCard key={startUp.id} startUp={startUp} username={this.props.username} currentUser={this.props.currentUser} />)
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value
    }, () => {
      if (this.props.currentUser.type === "investors") {
        this.setState({
          filteredStartUps: this.state.startUps.filter((startUp) => {return startUp.attributes.name.toLowerCase().includes(this.state.value)})
        })
      } else {
          this.setState({
            filteredStartUps: this.state.investors.filter((investor) => {return investor.attributes.name.toLowerCase().includes(this.state.value)})
          })
        }
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
          {this.props.currentUser.type === 'investors' ? <h1>Your startups favorite startups</h1> : <h1>I'm an investor, invested in investing</h1>}
        </Header>
        <Filter onChange={this.onChange}/>
        {this.props.currentUser.type === 'investors'? <DropDown onChange={this.onDropDownChange}/> : null}
        <Divider />
          {this.state.filteredStartUps.length > 0 ? <div className='start-up-container'>{this.makeFilteredStartUpCards()}</div> : <div className='start-up-container'>{this.makeStartUpCards()}</div>}
      </div>
    )
  }
}

export default StartUpList
