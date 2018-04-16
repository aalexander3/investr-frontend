import React from 'react'
import {Input, Button} from 'antd'

const Search = Input.Search
const URL = 'http://localhost:3000/api/v1/messages'

class MessageWindow extends React.Component {
  // can hold message bodies and new message text form
  state = {
    formValue: null,
    conversations: []
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
    }, () => console.log(this.state))
  }

  changing = (event) => {
    this.setState({
      formValue: event.target.value
    })
  }

  makeMessages = () => {
    return this.state.conversations.map(message => {
      console.log("im here in make messages");
      return (
        <div>{message.message_body}</div>
      )
    })
  }

  render(){
    return (
    <div id='message-window'>
      <div>{this.makeMessages()}</div>
      <Input placeholder="enter your message" size="large" value={this.state.formValue} onChange={this.changing}></Input>
      <Button type="primary" onClick={this.sendTheMessage}>Send</Button>
    </div>)
  }
}


export default MessageWindow
