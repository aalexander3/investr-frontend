import React from 'react'
import { Layout, Avatar, Popover } from 'antd';
import MessageAvatar from "./MessageAvatar.js"
const { Header, Footer, Sider } = Layout

const URL = 'http://localhost:3000/api/v1/start_up_investors'


class MessagePage extends React.Component {

  state = {
    startUps: [],
    currentConvo: null
  }

  // getUser = () => {
  //   if (this.props.username && (this.props.investors.length > 0)){
  //     return this.props.filterUser()
  //   }
  // }


  componentDidMount = () => {
    fetch(URL).then(res => res.json()).then(json => {
      const filteredList = json.data.filter(startUp => startUp.attributes.investor.username === this.props.username)
      const newFilter = filteredList.map(startUp => {
        return {name: startUp.attributes['start-up'].name, logo: startUp.attributes['start-up'].logo, url: startUp.attributes['start-up'].url}
      })

      this.setState({
        startUps: newFilter
      }, () => console.log(this.state.startUps))
    })
  }

  startNewMessage = (event) => {
    this.setState({
      currentConvo: event.target
    }, () => console.log(this.state.currentConvo))
  }

  renderStartups = () => {
    return this.state.startUps.map(startUp => {
    return (<MessageAvatar startUp={startUp} startNewMessage={this.startNewMessage}/>)
      })
  }

  render() {
    return(
      <div>
        <Header style={{background:"#EDEDEF"}}>{this.renderStartups()}</Header>
      </div>
    )
  }
}

export default MessagePage
