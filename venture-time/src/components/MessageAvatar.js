import React from "react"
import { Layout, Avatar, Popover } from 'antd';

const MessageAvatar = props => {
  return (
    <div onClick={props.startNewMessage} className="message-avatar">
        <Popover content={props.startUp.name}>
          <Avatar src={props.startUp.logo}/>
        </Popover>
    </div>
  )
}

export default MessageAvatar
