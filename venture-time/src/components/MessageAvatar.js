import React from "react"
import { Layout, Avatar, Popover } from 'antd';

const MessageAvatar = props => {
  console.log(props);
  const handleClick = event => {
    props.startNewMessage(props.conversation)
  }

  const renderAvatars = () => {
    if (props.type === 'investors') {
      return (
            <Popover content={props.conversation.attributes["start-up"].name}>
              <Avatar src={props.conversation.attributes["start-up"].logo}/>
            </Popover>
      )
    } else {
      return (
            <Popover content={props.conversation.attributes.investor.name}>
              <Avatar src={props.conversation.attributes.investor.logo}/>
            </Popover>
      )
    }
  }

  return (
    <div conversation={props.conversation} onClick={handleClick} className="message-avatar" >{renderAvatars()}</div>
  )
}

export default MessageAvatar
