import React, { Component } from 'react'
import { MessagesAdapter } from '../adapters/Adapter'
import { Input } from 'antd'
const Search = Input.Search

export default class MessageInput extends Component {
  state = {
    formValue: null,
  }

  handleInput = (event) => {
    this.setState({
      formValue: event.target.value
    })
  }

  sendTheMessage = (event) => {
    const data = {message_body: this.state.formValue, start_up_investor_id: this.props.startUpInvestorId, username: this.props.username}
    MessagesAdapter.create(data)
    this.clearForm()
  }

  clearForm = () => {
    this.setState({formValue: ''})
  }

  render(){
    return (
      <div id='new-message-form'>
        <Search
          placeholder="enter your message"
          enterButton="Send" size="large"
          value={this.state.formValue}
          onChange={this.handleInput}
          onSearch={this.sendTheMessage}>
        </Search>
      </div>
    )
  }
}
