import React from 'react'
import { Layout, Avatar, Icon, List, Divider} from 'antd';
const { Content, Sider } = Layout

const URL = 'http://localhost:3000/api/v1/start_up_investors'

class InvestorCard extends React.Component {

  state = {
    connections: []
  }

  onPanelChange(value, mode) {
    console.log(value, mode);
  }

  componentDidMount = () => {
    fetch(URL).then(res => res.json()).then(json => {
      if (this.props.investor.type === "investors") {
        const filteredList = json.data.filter(connection => connection.attributes.investor.username === this.props.attributes.username)
        const newFilter = filteredList.map(connection => {
          return {name: connection.attributes['start-up'].name, logo: connection.attributes['start-up'].logo, url: connection.attributes['start-up'].url}
        })
        this.setState({
          connections: newFilter
        })
      }else {
        const filteredList = json.data.filter(connection => connection.attributes["start-up"].username === this.props.attributes.username)
        const newFilter = filteredList.map(connection => {
          return {name: connection.attributes.investor.name, logo: connection.attributes.investor.logo, url: connection.attributes.investor.url}
        })
        this.setState({
          connections: newFilter
        })
      }
    })
  }

  render(){
    return(
      <div>
        <Layout hasSider={true}>
        <Content>
          <div className="card-banner">
              <img className="cover-photo" alt="cover" src='http://s3.amazonaws.com/s3.timetoast.com/public/uploads/photos/6327469/blurry-blue-background-ii_facebook_timeline_cover.jpg?1477360789' />
              {(this.props.attributes) ? <img id="card-avatar" src={this.props.attributes.logo} alt="company logo" /> : null}
              <h1>{this.props.attributes.name}</h1>
              <strong>{this.props.attributes.interests}</strong><br/>
              <strong> New York, NY </strong> || <span>   {this.state.connections.length} <Icon type="team" /></span>
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
              dataSource={this.state.connections}
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
