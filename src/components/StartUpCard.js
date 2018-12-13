import React from "react"
import { Col, Divider, Icon, Button, Alert } from 'antd'
import { ConnectionsAdapter } from '../adapters/Adapter'

class StartUpCard extends React.Component {
  state = {
    details: false,
    disliked: false,
    errors: null,
    liked: false,
  }

  componentDidMount = () => {
    this.likedStartup()
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

  likedStartup = () => {
    let found = this.findStartup()
    if (found){
      this.setState({liked: true})
    }
  }

  findStartup = () => {
    // trying to see if the startup has been liked previously
    const whatType = this.props.currentUser.type === 'investor' ? 'start_ups' : 'investors'

    let found = this.props.currentUser.attributes[whatType].find(conv => conv.id === parseInt(this.props.startUp.id,10))
    return found
  }

  handleLikes = () => {
    let found = this.findStartup()
    // IF not found send post request --------
    if (!found) {
      this.setState({
        liked: true
      })
      const data = {username: this.props.username, start_up_id: this.props.startUp.id}

      ConnectionsAdapter.create(data)
    }
  }

  handleDisLikes = () => {
    this.setState({
      disliked: true
    })
    // send a patch that officially dislikes the connection and doesn't show up again
  }

  makeButtonsAppear = () => {
    return (
      <div>
        {this.state.liked ?
          <img className='like-stamp' alt="like stamp" src={process.env.PUBLIC_URL + '/like-stamp.png'} /> :
          <Button type="default" icon="like" size='small' className='login-buttons' onClick={this.handleLikes}>LIKE</Button>}
          <Button type="default" icon="dislike" size='small' className='login-buttons' onClick={this.handleDisLikes}>NO THANKS</Button>
      </div>
    )
  }

    render() {
      if (!this.state.disliked) {
        return (
            <Col className="start-up-card" span={8}>
              {(this.state.errors) ? <Alert message={this.state.errors} type="error" /> : null }

              <div className='card-floater'>
                <img src={this.props.startUp.attributes.logo} alt="card logo" className='card-logo' align="middle" />
                <br/>
                {this.props.currentUser.type === 'investor' ? this.makeButtonsAppear() : <strong>Investor</strong>}
                <Divider />
              </div>

              <div className='content'>
                <span className='card-title'>{this.props.startUp.attributes.name}</span>
                <p style={{"fontStyle":"italic"}}>{this.props.startUp.attributes.field}</p>
                <div onClick={this.handleClick}>
                  {this.state.details ? <span className="more-info">Less <Icon type="minus-circle" /></span> : <span className="more-info">More <Icon type="plus-circle" /> </span>}
                </div>
                <br/>
                {this.state.details ? this.showTheDeets() : null}
              </div>
            </Col>
        )
      } else {
        return null
    }
  }
}

export default StartUpCard
