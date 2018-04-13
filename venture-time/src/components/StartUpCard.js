import React from "react"
import {Card, Col} from 'antd'

const StartUpCard = props => {
  return (
    <div>
      <Col className="start-up-card" span={8}>
        <h1>
          {props.startUp.attributes.name}
        </h1>
        <strong>Field:</strong><p>{props.startUp.attributes.field}</p>
        <strong>Mission:</strong><p>{props.startUp.attributes.mission}</p>
        <strong>Description:</strong><p>{props.startUp.attributes.description}</p>

      </Col>
    </div>
  )
}

export default StartUpCard
