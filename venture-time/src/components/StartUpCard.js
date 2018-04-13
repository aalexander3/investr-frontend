import React from "react"
import {Card} from 'antd'

const StartUpCard = props => {
  return (
    <div>
      <Card>
        {props.attributes.name}
      </Card>
    </div>
  )
}

export default StartUpCard
