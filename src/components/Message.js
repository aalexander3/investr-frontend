import React from 'react'
import {Avatar, Card} from 'antd'
const { Meta } = Card;


const Message = ({whatClass, date, message, username}) => {

  return (
    <div className={`${whatClass} message`} >
      {whatClass === "other" && <Avatar style={{margin: '.2rem'}}>{username}</Avatar>}
      <Card className={`${whatClass} card`} style={{ maxwWidth: 300 }}>
        <Meta description={date} />
        <span>{message.message_body}</span>
      </Card>
      {whatClass === "my" && <Avatar style={{margin: '.2rem'}}>{username}</Avatar>}
    </div>
  )
}

export default Message
