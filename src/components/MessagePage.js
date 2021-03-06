import React from 'react'
import { Layout } from 'antd';
import MessageAvatar from "./MessageAvatar.js"
// import { API_ROOT } from '../constants';
import Cable from './Cable';
import MessageWindow from './MessageWindow'
import withAuth from '../HOC/withAuth'
import '../styles/Message.css'

const { Header } = Layout

class MessagePage extends React.Component {

  state = {
    currentConvo: null,
    conversations: [],
    messages: []
  }

  componentDidMount = () => {
    const filteredList = this.props.currentUser.attributes.start_up_investors.data
    const messageList = this.mapTheMess(filteredList)

      this.setState({
        conversations: filteredList,
        messages: messageList
      })
  }

  mapTheMess = (conversations) => {
    let mappedMess = []

    conversations.forEach(conversation => {
      conversation.attributes.messages.forEach(message => {
        mappedMess.push(message)
      })
    })
    return mappedMess
  }

  startNewMessage = conversation => {
     (this.state.currentConvo === conversation) ?
      this.setState({ currentConvo: null }) :
      this.setState({ currentConvo: conversation}, this.goToBottom )
  }

  renderStartups = () => {
    return this.state.conversations.map(conversation => <MessageAvatar
        key={conversation.id}
        type={this.props.currentUser.type}
        conversation={conversation}
        startNewMessage={this.startNewMessage}/>)
  }

  handleReceivedMessage = response => {
    const message = response.data.attributes;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(conv => message.start_up_investor_id === parseInt(conv.id,10))
    conversation.attributes.messages = [...conversation.attributes.messages, message];
    this.setState({
      conversations: conversations,
      messages: [...this.state.messages, message]
     })
    this.goToBottom()
  }

  goToBottom = () => {
    let element = document.getElementById('message-box')
    element.scrollTop = element.scrollHeight - element.clientHeight
  }

  filterMessages = () => {
    if (this.state.currentConvo) {
      return this.state.messages.filter(message => {
        return message.start_up_investor_id === parseInt(this.state.currentConvo.id, 10)
      })
    }
  }

  render() {
    return(
      <div>
        <Header style={{background:"#3B627E"}}>{this.renderStartups()}</Header>
        <Cable conversations={this.state.conversations} handleReceivedMessage={this.handleReceivedMessage} />
        {this.state.currentConvo && this.props.currentUser.attributes && <MessageWindow
            type={this.props.currentUser.type}
            goToBottom={this.goToBottom}
            filteredMessages={this.filterMessages()}
            username={this.props.currentUser.attributes.username}
            conversation={this.state.currentConvo}
            conversations={this.state.conversations} /> }
      </div>
    )
  }
}

export default withAuth(MessagePage)
