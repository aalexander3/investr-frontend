import React from 'react'
import {Input, Button, Divider, Layout, Avatar, Card} from 'antd'

const { Meta } = Card;
const {Header} = Layout
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
      <div className='my-message'>
        <Card className='my-card' style={{ width: 300 }}>
          <Meta description={date.toString().slice(0, -18)} avatar={<Avatar>ME</Avatar>} />
          <span style={{float:"right"}}>{message.message_body}</span>
        </Card>
        <br/>
      </div>
    )
  }

  message = (message) => {
    let date = new Date(message.created_at)
    return (
      <div className='other-message' >
        <Card className='other-card' style={{ width: 300 }}>
          <Meta description={date.toString().slice(0, -18)} avatar={<Avatar>{message.username.slice(0)}</Avatar>} />
          <span style={{float:"right"}}>{message.message_body}</span>
        </Card>
        <br/>
      </div>
    )
  }

  render(){
    return (
    <div id='message-window'>
      <div id='message-box'>
        <h5 style={{'left': '40%', 'top': '27%', 'position':'fixed'}}>Your conversation with {this.props.type === 'investors' ? this.props.conversation.attributes["start-up"].name : this.props.conversation.attributes.investor.name} </h5>
        {this.makeMessages()}
      </div>
      <div id='new-message-form'>
        <Input style={{width: '60%'}} placeholder="enter your message" size="large" value={this.state.formValue} onChange={this.changing}></Input>
        <Button type="primary" onClick={this.sendTheMessage}>Send</Button>
      </div>
    </div>)
  }
}

export default MessageWindow
