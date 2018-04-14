import { Carousel, Row, Layout, Divider } from 'antd';
import React from 'react'
import StartUpCard from "./StartUpCard.js"
const { Header, Content, Sider, Footer } = Layout
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
    return this.state.startUps.slice(start, end).map((startUp) =>  <StartUpCard key={startUp.id} startUp={startUp} username={this.props.username} />)
  }

  // onChange(a, b, c) {
  //   console.log(a, b, c);
  // }

  render() {
    return(
      <div style={{margin:'1% 4%'}}>
        <Header style={{background: 'white'}}>
          <h1>Your startup's favorite startups</h1>
        </Header>
         <Divider />
         {/* think about how we might get a carousel back  */}
        {/* <Carousel id="carousel-list" afterChange={this.onChange}> */}
          <div className='start-up-container'>{this.makeStartUpCards()}</div>
          {/* <div>{this.makeStartUpCards(3,6)}</div>
          <div>{this.makeStartUpCards(6,9)}</div>
          <div>{this.makeStartUpCards(9,12)}</div> */}
        {/* </Carousel> */}
      </div>
    )
  }
}

export default StartUpList
