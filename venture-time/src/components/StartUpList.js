import { Carousel, Row, Layout, Divider } from 'antd';
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

  // onChange(a, b, c) {
  //   console.log(a, b, c);
  // }

  onChange = (event) => {
    this.setState({
      value: event.target.value
    }, () => {
      this.setState({
        filteredStartUps: this.state.startUps.filter((startUp) => {return startUp.attributes.name.toLowerCase().includes(this.state.value)})
      }, () => console.log(this.state.filteredStartUps))
    })
  }

  onDropDownChange = (event) => {
    this.setState({
      dropDownVal: event.target.value
    }, () => console.log(this.state.dropDownVal))
  }

  renderStartUps = () => {
    if(this.state.dropDownVal === "all") {
      this.makeStartUpCards()
    } else if(this.state.dropDownVal === "Technology") {
      return this.state.startUps.filter((startUp) => {return startUp.attributes.field === "Technology"})
    } else if (this.state.dropDownVal === "Food") {
      return this.state.startUps.filter((startUp) => {return startUp.attributes.field === "Food"})
    } else if (this.state.dropDownVal === "Finance") {
      return this.state.startUps.filter((startUp) => {return startUp.attributes.field === "Finance"})
    } else if (this.state.dropDownVal === "Healthcare") {
      return this.state.startUps.filter((startUp) => {return startUp.attributes.field === "Healthcare"})
    }
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
         {/* think about how we might get a carousel back  */}
        {/* <Carousel id="carousel-list" afterChange={this.onChange}> */}
          {this.state.filteredStartUps.length > 0 ? <div className='start-up-container'>{this.makeFilteredStartUpCards()}</div> : <div className='start-up-container'>{this.makeStartUpCards()}</div>}
          {/* <div>{this.makeStartUpCards(3,6)}</div>
          <div>{this.makeStartUpCards(6,9)}</div>
          <div>{this.makeStartUpCards(9,12)}</div> */}
        {/* </Carousel> */}
      </div>
    )
  }
}

export default StartUpList
