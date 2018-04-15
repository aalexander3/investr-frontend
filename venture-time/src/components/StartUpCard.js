import React from "react"
import {Card, Col, Divider, Rate, Icon, Button } from 'antd'

class StartUpCard extends React.Component {
  state = {
    details: false,
    disliked: false
  }

  handleClick = () => {
    this.setState({
      details: !this.state.details
    })
  }

  showTheDeets = () => {
    return (
      <div>
        <strong>Mission:</strong><p>{this.props.startUp.attributes.mission}</p>
        <strong>Description:</strong><p>{this.props.startUp.attributes.description}</p>
      </div>
    )
  }

  handleLikes = () => {
    const data = {username: this.props.username, start_up_id: this.props.startUp.id}
    fetch("http://localhost:3000/api/v1/start_up_investors", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accepts" : "application/json",
        'Content-type': "application/json"
      }
    }).then(res => res.json()).then(console.log)
  }

  handleDisLikes = () => {
    this.setState({
      disliked: true
    })
  }


    render() {
      console.log(this.props.startUp);
      if (!this.state.disliked) {
        return (
          <div>
            <Col className="start-up-card" span={8}>

              <div className='card-floater'>
                <img src={this.props.startUp.attributes.logo} className='card-logo' align="middle" />
                <br/>
                <Button type="default" icon="like" size='small' className='login-buttons' onClick={this.handleLikes}>LIKE</Button>
                <Button type="default" icon="dislike" size='small' className='login-buttons' onClick={this.handleDisLikes}>NO THANKS</Button>
                <Divider/>
              </div>

              <div className='content'>
              <span className='card-title'>{this.props.startUp.attributes.name}</span>
              <p style={{"fontStyle":"italic"}}>{this.props.startUp.attributes.field}</p>
              <div onClick={this.handleClick}>
                {this.state.details ? <span>Less <Icon type="minus-circle" /></span> : <span>More <Icon type="plus-circle" /> </span>}
              </div>
              <br/>
              {(this.state.details) ? this.showTheDeets() : null}
            </div>
            </Col>
          </div>
        )
    } else {
      return null
    }
  }
}

export default StartUpCard
