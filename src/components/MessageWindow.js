import React from 'react'
import Message from './Message'
import MessageInput from './MessageInput'

const MessageWindow = props => {

  const makeMessages = () => {
    return props.filteredMessages.map(message => {
      if (message.username === props.username) {
        return myMessage(message)
      } else {
        return otherMessage(message)
      }
    })
  }

  const myMessage = (message) => {
    let date = new Date(message.created_at).toLocaleTimeString('en-US')
    return <Message whatClass="my" key={message.id} date={date} message={message} username="ME" />
  }

  const otherMessage = (message) => {
    let date = new Date(message.created_at).toLocaleTimeString('en-US')
    return <Message whatClass="other" key={message.id} date={date} message={message} username={message.username.slice(0)} />
  }

  return (
    <div id='message-window'>
      <h5 style={{alignSelf: 'center', position: 'fixed'}}>Your conversation with {props.type === 'investor' ? props.conversation.attributes["start_up"].name : props.conversation.attributes.investor.name} </h5>
      <div id='message-box'>
        {makeMessages()}
      </div>
      <MessageInput startUpInvestorId={props.conversation.id} username={props.username} />
    </div>
  )
}

export default MessageWindow
