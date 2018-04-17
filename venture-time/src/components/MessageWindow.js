import React from 'react'
import {Input, Button, Divider} from 'antd'

const Search = Input.Search
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
    }, () => console.log(this.state))
  }

  changing = (event) => {
    this.setState({
      formValue: event.target.value
    })
  }

  // id: 1, message_body: "hi blend i like you", username: "arren", start_up_investor_id: 1, created_at: "2018-04-16T20:56:52.041Z", …}

  makeMessages = () => {
    return this.state.conversations.map(message => {
      let date = new Date(message.created_at)
      return (
        <div>
          <strong>{message.username}: </strong>
          <span>{" " + message.message_body}</span>
          <p>{date.toString().slice(0, -18)}</p>
          <Divider />
        </div>
      )
    })
  }

  render(){
    return (
    <div id='message-window'>
      <div id='message-box'>{this.makeMessages()}</div>
      <div id='new-message-form'>
        <Input style={{width: '60%'}} placeholder="enter your message" size="large" value={this.state.formValue} onChange={this.changing}></Input>
        <Button type="primary" onClick={this.sendTheMessage}>Send</Button>
      </div>
    </div>)
  }
}

export default MessageWindow
