import React from 'react'
import { Layout, Avatar, Popover } from 'antd';
import MessageAvatar from "./MessageAvatar.js"
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import Cable from './Cable';
import MessageWindow from './MessageWindow'


const { Header, Footer, Sider } = Layout
const URL = 'http://localhost:3000/api/v1/start_up_investors'


class MessagePage extends React.Component {

  state = {
    currentConvo: null,
    conversations: [],
    messages: []
  }

  componentDidMount = () => {
    fetch(URL).then(res => res.json()).then(json => {
      const filteredList = json.data.filter(startUp => startUp.attributes.investor.username === this.props.username)

      const messageList = this.mapTheMess(json.data)

      this.setState({
        conversations: filteredList,
        messages: messageList
      }, () => console.log(this.state))
    })
  }

  mapTheMess = (data) => {
    let mappedMess = []
    data.forEach(conversation => {
      conversation.attributes.messages.forEach(message => {
        mappedMess.push(message)
      })
    })
    return mappedMess
  }

  startNewMessage = conversation => {
    this.setState({
      currentConvo: conversation
    }, () => {
      this.goToBottom()
    })
  }

  renderStartups = () => {
    return this.state.conversations.map(conversation => {
    return (<MessageAvatar conversation={conversation} startNewMessage={this.startNewMessage}/>)
      })
  }

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  }

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(conv => {
      return message.start_up_investor_id == conv.id
      });
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
        return message.start_up_investor_id === parseInt(this.state.currentConvo.id)
      })
    }
  }

  getMessages() {
    fetch(URL)
      .then(resp => resp.json())
      .then(json => console.log(json.conversations))
  }

  render() {
    return(
      <div>
        <Header style={{background:"#EDEDEF"}}>{this.renderStartups()}</Header>
        <ActionCable
          channel={{ channel: 'StartUpInvestorsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={this.state.conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        {this.state.currentConvo ? <MessageWindow goToBottom={this.goToBottom} filteredMessages={this.filterMessages} username ={this.props.username} conversation={this.state.currentConvo} conversations={this.state.conversations} /> : null}
      </div>
    )
  }
}

export default MessagePage
