import { Carousel } from 'antd';
import React from 'react'
import StartUpCard from "./StartUpCard.js"
const URL = 'http://localhost:3000/api/v1/start_ups'


class StartUpList extends React.Component {

  state = {
    startUps: []
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
    return this.state.startUps.slice(start, end).map((startUp) =>  <StartUpCard key={startUp.id} startUp={startUp} />)
  }

  onChange(a, b, c) {
    console.log(a, b, c);
  }

  render() {

    return(
      <div>
        {this.makeStartUpCards()}
        <Carousel afterChange={this.onChange}>
          <div>{this.makeStartUpCards(0,3)}</div>
          <div>{this.makeStartUpCards(3,6)}</div>
          <div>{this.makeStartUpCards(6,9)}</div>
          <div>{this.makeStartUpCards(9,12)}</div>
        </Carousel>
      </div>
    )
  }
}

export default StartUpList
