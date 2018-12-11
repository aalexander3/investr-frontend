import React from 'react'
import { Icon, Divider} from 'antd';


class InvestorCard extends React.Component {

  render(){
    return (
      <div className="card-banner">
        <img className="cover-photo" alt="cover" src='http://s3.amazonaws.com/s3.timetoast.com/public/uploads/photos/6327469/blurry-blue-background-ii_facebook_timeline_cover.jpg?1477360789' />
        {(this.props.attributes) ? <img id="card-avatar" src={this.props.attributes.logo} alt="company logo" /> : null}
        <h1>{this.props.attributes.name}</h1>
        <strong>{this.props.attributes.interests}</strong><br/>
        <strong> New York, NY </strong> || <span>   {this.props.connections.length} <Icon type="team" /></span>
        <p>{this.props.attributes.mission}</p>
        <Divider />
        <p> {this.props.attributes.description} </p>
        <span> <Icon type="link" /> <a href={this.props.attributes.url}> Visit </a></span>
        <span> ||  <Icon type="credit-card" />  {(this.props.attributes['funds-to-invest'] > 1000000) ? '$$$$' : '$$'} </span>
      </div>
    )
  }
}

export default InvestorCard
