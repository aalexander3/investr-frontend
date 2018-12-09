import React from "react"
import { Col, Divider, Icon, Button, Alert } from 'antd'
// import LikeStamp from '../../public/like-stamp.jpg'

const URL = 'http://localhost:3000/api/v1/start_up_investors'


class StartUpCard extends React.Component {
  state = {
    details: false,
    disliked: false,
    errors: null,
    liked: false,
    conversations: []
  }

  componentDidMount = () => {
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({
        conversations: json.data
      }, () => console.log(this.state.conversations))
    })
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
    this.setState({
      liked: true
    })
    const data = {username: this.props.username, start_up_id: this.props.startUp.id}

    let found = this.state.conversations.find(convo => {
      return convo.attributes.investor.username === data.username && convo.attributes['start-up'].id === parseInt(data.start_up_id, 10)
    })
    // IF not found send post request --------
    if (!found) {
      fetch(URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Accepts" : "application/json",
          'Content-type': "application/json"
        }
      })
    }
  }

  handleDisLikes = () => {
    this.setState({
      disliked: true
    })
  }

  makeButtonsAppear = () => {
    return (
      <div>
        {this.state.liked ? <img className='like-stamp' alt="like stamp" src={process.env.PUBLIC_URL + '/like-stamp.png'} /> : <Button type="default" icon="like" size='small' className='login-buttons' onClick={this.handleLikes}>LIKE</Button>}
        <Button type="default" icon="dislike" size='small' className='login-buttons' onClick={this.handleDisLikes}>NO THANKS</Button>
      </div>
    )
  }

    render() {
      if (!this.state.disliked) {
        return (
          <div>
            <Col className="start-up-card" span={8}>
              {(this.state.errors) ? <Alert message={this.state.errors} type="error" /> : null }

              <div className='card-floater'>
                <img src={this.props.startUp.attributes.logo} alt="card logo" className='card-logo' align="middle" />
                <br/>
                {this.props.currentUser.type === 'investors' ? this.makeButtonsAppear() : <strong>Investor</strong>}
                <Divider/>
              </div>

              <div className='content'>
              <span className='card-title'>{this.props.startUp.attributes.name}</span>
              <p style={{"fontStyle":"italic"}}>{this.props.startUp.attributes.field}</p>
              <div onClick={this.handleClick}>
                {this.state.details ? <span className="more-info">Less <Icon type="minus-circle" /></span> : <span className="more-info">More <Icon type="plus-circle" /> </span>}
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
