import React from "react"
import { Layout, Avatar, Popover } from 'antd';

const MessageAvatar = props => {

  const handleClick = event => {
    props.startNewMessage(props.conversation)
  }

  return (
    <div conversation={props.conversation} onClick={handleClick} className="message-avatar">
        <Popover content={props.conversation.attributes["start-up"].name}>
          <Avatar src={props.conversation.attributes["start-up"].logo}/>
        </Popover>
    </div>
  )
}

export default MessageAvatar
