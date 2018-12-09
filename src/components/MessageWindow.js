import React from 'react'
import {Input, Avatar, Card} from 'antd'

const Search = Input.Search
const { Meta } = Card;
const URL = 'http://localhost:3000/api/v1/messages'

class MessageWindow extends React.Component {
  // can hold message bodies and new message text form
  state = {
    formValue: null,
    conversations: this.props.filteredMessages()
  }

  sendTheMessage = (event) => {
    const data = {message_body: this.state.formValue, start_up_investor_id: this.props.conversation.id, username: this.props.username}
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accepts: 'application/json',
        'Content-type': 'application/json'
      }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      formValue: null,
      conversations: nextProps.filteredMessages()
    })
  }

  changing = (event) => {
    this.setState({
      formValue: event.target.value
    })
  }

  makeMessages = () => {
    return this.state.conversations.map(message => {
      if (message.username === this.props.username) {
        return this.myMessage(message)
      } else {
        return this.message(message)
      }
    })
  }

  myMessage = (message) => {
    let date = new Date(message.created_at)
    return (
      <div className='my-message' key={message.id}>
        <Card className='my-card' style={{ maxwWidth: 300 }}>
          <Meta description={date.toLocaleTimeString('en-US')} />
          <span>{message.message_body}</span>
        </Card>
        <Avatar style={{margin: '.2rem'}}>ME</Avatar>
      </div>
    )
  }

  message = (message) => {
    // refactor messages into components
    let date = new Date(message.created_at)
    return (
      <div className='other-message' key={message.id}>
        <Avatar style={{margin: '.2rem'}}>{message.username.slice(0)}</Avatar>
        <Card className='other-card' style={{ maxWidth: 300 }}>
          <Meta description={date.toLocaleTimeString('en-US')} />
          <span >{message.message_body}</span>
        </Card>
      </div>
    )
  }

  render(){
    return (
    <div id='message-window'>
      <h5 style={{alignSelf: 'center', position: 'fixed'}}>Your conversation with {this.props.type === 'investors' ? this.props.conversation.attributes["start-up"].name : this.props.conversation.attributes.investor.name} </h5>
      <div id='message-box'>
        {this.makeMessages()}
      </div>
      <div id='new-message-form'>
        <Search style={{width: '100%'}} placeholder="enter your message" enterButton="Send" size="large" value={this.state.formValue} onChange={this.changing} onSearch={this.sendTheMessage}></Search>
      </div>
    </div>)
  }
}

export default MessageWindow
