import React from 'react'
import { Layout, Avatar, Icon, List, Divider} from 'antd';
const { Header, Content, Sider } = Layout

const URL = 'http://localhost:3000/api/v1/start_up_investors'

class InvestorCard extends React.Component {

  state = {
    startUps: []
  }

  onPanelChange(value, mode) {
    console.log(value, mode);
  }

  componentDidMount = () => {
    fetch(URL).then(res => res.json()).then(json => {
      const filteredList = json.data.filter(startUp => startUp.attributes.investor.username === this.props.attributes.username)
      const newFilter = filteredList.map(startUp => {
        return {name: startUp.attributes['start-up'].name, logo: startUp.attributes['start-up'].logo, url: startUp.attributes['start-up'].url}
      })

      this.setState({
        startUps: newFilter
      }, () => console.log(this.state.startUps))
    })
  }

  // investor": {
  //         "id": 3,
  //         "name": "Arren Alexander",
  //         "mission": "Help exciting new companies grow",
  //         "description": "Small investing firm looking for new investment opportunities",
  //         "interests": null,
  //         "logo": "https://images.unsplash.com/photo-1504670073073-6123e39e0754?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=23c233a430f2ca6be8d78f8608b416d5&auto=format&fit=crop&w=1050&q=80",
  //         "url": "https://www.linkedin.com/in/arren-alexander-10a361124",
  //         "funds_to_invest": 1200000,
  //         "active": true,
  //         "created_at": "2018-04-13T18:51:51.108Z",
  //         "updated_at": "2018-04-13T18:51:51.108Z",
  //         "username": "arren",
  //         "password_digest": "$2a$10$jW/2LefIcnc1DzLrwccYvuUOSqjZ.7xwtP0kUkvPYIHsK3V2EMY3C"
  //       }

  render(){
    console.log(this.props);
    return(
      <div>
        <Layout hasSider={true}>
        <Content>
          <div className="card-banner">
              <img className="cover-photo" src='http://s3.amazonaws.com/s3.timetoast.com/public/uploads/photos/6327469/blurry-blue-background-ii_facebook_timeline_cover.jpg?1477360789' />
              {(this.props.attributes) ? <img id="card-avatar" src={this.props.attributes.logo} alt="company logo" /> : null}
              <h1>{this.props.attributes.name}</h1>
              <strong>{this.props.attributes.interests}</strong><br/>
              <strong> New York, NY </strong> || <span>   {this.state.startUps.length} <Icon type="team" /></span>
              <p>{this.props.attributes.mission}</p>
              <Divider />
              <p> {this.props.attributes.description} </p>
              <span> <Icon type="link" /> <a href={this.props.attributes.url}> Visit </a></span>
              <span> ||  <Icon type="credit-card" />  {(this.props.attributes['funds-to-invest'] > 1000000) ? '$$$$' : '$$'} </span>
          </div>
        </Content>
        <div id='investor-card-sider' >
          <Sider style={{background: '#EDEDEF'}}>
            <h3>My Connections</h3>
            <List
              itemLayout="horizontal"
              dataSource={this.state.startUps}
              renderItem={item => (
                <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} />}
                  title={<a href={item.url}>{item.name}</a>}
                />
                </List.Item>
              )}
            />
          </Sider>
        </div>
      </Layout>
      </div>
    )
  }
}

export default InvestorCard
