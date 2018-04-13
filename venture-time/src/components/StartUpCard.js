import React from "react"
import {Card, Col} from 'antd'

const StartUpCard = props => {
  return (
    <div>
      <Col span={8}>
        <Card>
          {props.startUp.attributes.name}
        </Card>
      </Col>
    </div>
  )
}

export default StartUpCard
